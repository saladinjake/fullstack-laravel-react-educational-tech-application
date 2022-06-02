<?php

namespace App\Services\V1;

use App\Models\InstructorProfile;
use App\Models\LearnerProfile;
use App\Models\User;
use App\Models\Course;
use App\Models\Language;
use App\Services\BaseService;
use Exception;
use DB;
use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ProfileUpdateNotification;
use App\Mail\InstructorWelcome;
use Illuminate\Support\Facades\Mail;
use App\Mail\InstructorApproved;
use App\Mail\InstructorDisapproved;
use App\Mail\InstructorDeactivated;
use jeremykenedy\LaravelRoles\Models\Role;

class InstructorProfileService extends BaseService
{
    public function fetchAll()
    {
        try {
            $profile = config('roles.models.role')::where('name', 'Instructor')->first()->users()->has('instructorProfile')->paginate(2);
            $counter = $profile->count();
            if ($counter < 1 ) {
                return formatResponse(200, 'No instructor record found', true, $profile);
            } else {
                // $profiles = User::where(['category' => 'INS'])->with('instructorProfile')->paginate(15);
                $profiles = config('roles.models.role')::where('name', 'Instructor')->first()->users()->has('instructorProfile')->with('instructorProfile')->get()->makeHidden(['pivot']);
                return formatResponse(200, 'Instructor profile(s) retrieved successfully', true, $profiles);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        try {
            $user = User::where(['id' => $id])->first();
            if (! $user) {
                return formatResponse(404, 'User doesn\'t exist!', false);
            } elseif (! $user->hasRole('instructor')) {
                return formatResponse(404, 'Provided instructor not found', false);
            } else {

                $profile = User::where('id', $id)->with('instructorProfile', 'courses')->first();
                $co_authored_courses = Course::withAndWhereHas('instructors', function($query) use ($id){
           $query->where('course_instructors.instructor_id', $id); })->get();

                return formatResponse(200, 'Instructor profile retrieved successfully', true, [
                    'profile' => $profile,
                    'co_authored_courses' => $co_authored_courses
                    ]);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getInstructorProfile()
    {
        try {
            $currentUser = $this->getLoggedInUser();
            if (User::where('id', $currentUser['0'])->exists()) {
                $user = $this->getFullProfile($currentUser['0']);
                $completeness = $this->getProfileCompleteness($currentUser['0']);

                return formatResponse(200, 'Instructor profile retrieved successfully', true, ['user' => $user, 'completeness' => $completeness]);
            } else {
                return formatResponse(404, 'User not found', false);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function create($data)
    {
        try {
            $instructor = $this->getLoggedInUser();

            $instructorProfile = $this->getProfile($instructor['0']);
            $userProfile = $this->getUser($instructor['0']);
            $lang = $this->getLanguage($data['language']);
            $data['language'] = $lang['0'];

            /*if (! empty($data['image_url'])) {
                $uploader = $data['image_url']->storeOnCloudinary('Questence-Passports');
                $data['image_url'] = $uploader->getSecurePath();
            }*/

            if (! $instructorProfile) {

                DB::transaction(function () use ($instructor, $userProfile, $data) {
                    if (User::where(['id' => $instructor['0']])->exists()) {
                        $data['user_id'] = $instructor['0'];
                        $saveProfile = InstructorProfile::create($data);
                        $userProfile->update($data);
                    } else {
                        return formatResponse(404, 'User record not found', false);
                    }
                });

                $profile = $this->getFullProfile($instructor['0']);

                return formatResponse(201, 'Instructor profile created successfully.', true, $profile);

            } else {

                $profileUpdater = $instructorProfile->update($data);
                $userUpdater = $userProfile->update($data);

                if ($profileUpdater AND $userUpdater){

                    $profile = $this->getFullProfile($instructor['0']);

                    return formatResponse(200, 'Instructor profile updated successfully', true, $profile);

                } else {
                    return formatResponse(422, 'Oh Snap! An error occurred. Profile not updated', false);
                }
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function update($data, $id)
    {
        try {
            $instructor = $this->getLoggedInUser();
            $instructorProfile = $this->getProfile($id);
            $user = $this->getUser($id);

            $lang = $this->getLanguage($data['language']);
            $data['language'] = $lang['0'];

            if ($id != Auth::id()) {
                return formatResponse(403, 'Forbidden. You\'re unauthorized to make this request', false);
            }

            /*if (! empty($data['image_url'])) {
                $uploader = $data['image_url']->storeOnCloudinary('Questence-Passports');
                $data['image_url'] = $uploader->getSecurePath();
            }*/

            if (! $user) {
                return formatResponse(404, 'User record not found', false);
            }

            if (! $instructorProfile) {

                DB::transaction(function () use ($instructor, $user, $data) {
                    $data['user_id'] = $instructor['0'];
                    $saveProfile = InstructorProfile::create($data);
                    $user->update($data);
                });

            } else {

                DB::transaction(function () use ($data, $instructorProfile, $user, $id) {
                    $instructorProfile->update($data);
                    $user->update($data);
                });
            }

            $profile = $this->getFullProfile($instructor['0']);

            $this->sendNotification($user);

            return formatResponse(200, 'Instructor profile updated successfully.', true, $profile);

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getCourses() {
      try {
         $instructor_id = Auth::id();
         $courses = Course::withAndWhereHas('instructors', function($query) use ($instructor_id){
           $query->where('course_instructors.instructor_id', $instructor_id); })->get();
         if (! $courses) {
             return formatResponse(200, 'No Courses found', true);
         } else {
             return formatResponse(200, 'Courses retrieved successfully', true, $courses);
         }
      } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getCourse($id)
    {
        try {
            $user = User::find(Auth::id());
            $instructor_id = $user->instructorProfile->id;
            $course = Course::where('id', $id)->first();
            if (! $course) {
                return formatResponse(404, 'Course doesn\'t exist!', false);
            } else {
                $course = Course::where([['id', $id], ['instructor_id', $instructor_id]])->first();
                return formatResponse(200, 'Course retrieved successfully', true, $course);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function activate($id, $data = null)
    {
        try {

            $user = User::where(['id' => $id])->first();
            $instructorProfile = InstructorProfile::where(['user_id' => $id])->first();

            if (! $user) {
                return formatResponse(404, 'Instructor profile not found', false);
            } elseif (! $user->hasRole('instructor')) {
                return formatResponse(422, 'Provided user not an instructor!', false);
            } else{

                $password = str_random(12);

                DB::beginTransaction();
                    $user->update(['status' => '1', 'password' => bcrypt($password)]);
                    $instructorProfile->update(['status' => '1']);
                DB::commit();

                try {
                    Mail::to($user->email)->send(new InstructorApproved($user, $password));
                } catch (\Exception $e) {
                    return response()->json([
                        'message' => 'Instructor profile APPROVED but unable to send email to instructor. Please check your network connectivity.',
                    ], 200);
                }

                $profile = $this->getFullProfile($id);

                return formatResponse(200, 'Instructor profile activated successfully', true, $profile);
            }

        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function disapprove($id, $data = null)
    {
      try {

          $instructorProfile = InstructorProfile::where(['user_id' => $id])->first();

          if (! $instructorProfile) {
              return formatResponse(404, 'Instructor profile not found', false);
          }

          DB::beginTransaction();
              $instructorProfile->delete();
          DB::commit();

          try {
              Mail::to($user->email)->send(new InstructorDisapproved($user));
          } catch (\Exception $e) {
              return response()->json([
                  'message' => 'Instructor request DISAPPROVED but unable to send email to instructor. Please check your network connectivity.',
              ], 200);
          }

          return formatResponse(200, 'Instructor profile request has been disapproved', true);
      } catch (Exception $e) {
          DB::rollback();

          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function deactivate($id, $data = null)
    {
        try {

            $user = User::where(['id' => $id])->first();
            $instructorProfile = InstructorProfile::where(['user_id' => $id])->first();

            if (! $user) {
                return formatResponse(404, 'Instructor profile not found', false);
            } elseif (! $user->hasRole('instructor')) {
                return formatResponse(400, 'Provided user not an instructor!', false);
            } else{

                DB::beginTransaction();
                    $user->update(['status' => '-1']);
                    $instructorProfile->update(['status' => '-1']);
                DB::commit();

                try {
                    Mail::to($user->email)->send(new InstructorDeactivated($user));
                } catch (\Exception $e) {
                    return response()->json([
                        'message' => 'Instructor profile DEACTIVATED but unable to send email to instructor. Please check your network connectivity.',
                    ], 200);
                }

                return formatResponse(200, 'Instructor profile deactivated successfully', true);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function active()
    {
        try {

            $instructorProfile = User::whereNotNull('email_verified_at')->where('status', '>=', '1')->whereHas('roles', function ($query) {
                $query->where('roles.name', 'Instructor');
            })->first();

            if (! $instructorProfile) {
                return formatResponse(200, 'No Active instructor profile found', true);
            } else {

                $activeProfiles = User::with('courses','instructorProfile')->whereNotNull('email_verified_at')->where('status', '>=', '1')->whereHas('roles', function ($query) {
                    $query->where('roles.name', 'Instructor');
                })->get();

                return formatResponse(200, 'Active Instructor profiles retrieved successfully', true, $activeProfiles);
            }

        } catch (Exception $e) {

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function deactivated()
    {
        try {

            $instructorProfile = User::where('status', '-1')->whereHas('roles', function ($query) {
                $query->where('roles.name', 'Instructor');
            })->first();

            if (! $instructorProfile) {
                return formatResponse(200, 'No Deactivated instructor profile found', true);
            } else {

               $deactivatedProfiles = User::with('instructorProfile')->where('status', '-1')->whereHas('roles', function ($query) {
                    $query->where('roles.name', 'Instructor');
                })->paginate(15);

                return formatResponse(200, 'Deactivated Instructor profiles retrieved successfully', true, $deactivatedProfiles);
            }

        } catch (Exception $e) {

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function pending()
    {
        try {

            $instructorProfile = User::where('status', '0')->whereHas('roles', function ($query) {
                $query->where('roles.name', 'Instructor');
            })->first();

            if (! $instructorProfile) {
                return formatResponse(200, 'No Pending instructor profile found', true);
            } else {

                $pendingProfiles = User::with('instructorProfile')->where('status', '0')->whereHas('roles', function ($query) {
                    $query->where('roles.name', 'Instructor');
                })->paginate(15);

                return formatResponse(200, 'Pending Instructor profiles retrieved successfully', true, $pendingProfiles);
            }

        } catch (Exception $e) {

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function delete($id, $data = null)
    {
        try {

            $instructorProfile = InstructorProfile::where(['user_id' => $id])->first();

            if (! $instructorProfile) {
                return formatResponse(404, 'Instructor profile not found', false);
            }

            DB::beginTransaction();
                $instructorProfile->delete();
            DB::commit();

            return formatResponse(200, 'Instructor profile deleted successfully', true);
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    private function getProfileCompleteness(int $userId)
    {
      $columns = InstructorProfile::where('user_id', $userId)->first()->makeHidden(['id', 'status', 'created_at', 'updated_at', 'deleted_at'])->toArray();
      $initial = count($columns);
      $percentage = count($columns);
      foreach($columns as $column) {
        if ($column == NULL)
        {
            $percentage--;
        }
      }
      return round($percentage/$initial * 100);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        //..
    }

    public function fetchMany($begin, $perPage, $sortBy, $sortDirection)
    {
        //..
    }

    public function getLoggedInUser()
    {
        $user = User::where(['id' => Auth::id()])->pluck('id');

        return $user;
    }

    public function getUser($id)
    {
        $user = User::where(['id' => $id])->first();

        return $user;
    }

    private function getFullProfile(int $userId)
    {
        return User::where(['id' => $userId])->with('instructorProfile')->first();
    }


    private function getProfile(int $userId)
    {
        return InstructorProfile::where(['user_id' => $userId])->first();
    }

    public function getLanguage($id)
    {
        $lang = Language::where(['id' => $id])->pluck('english');

        return $lang;
    }

    public function getRole()
    {
        $instructorRole = config('roles.models.role')::where('name', '=', 'Instructor')->pluck('id');
    }

    public function sendNotification($user)
    {
        $notif = [
          'greeting' => "$user->first_name,",
          'body' => "Your profile has been updated",
          'thanks' => '',
          'actionText' => 'View',
          'actionURL' => url('/profile'),
          'user_id' => $user->id
        ];
        try {
        return Notification::send($user, new ProfileUpdateNotification($notif));
      } catch (\Exception $e) {
          Log::error('Profile updated successfully, but unable to send Notification to User. Please check your network connectivity.');
      }
    }

    public function updateInstructor($data, $id)
    {
        try {
            $instructorProfile = $this->getProfile($id);
            $user = $this->getUser($id);

            /*if (! empty($data['image_url'])) {
                $uploader = $data['image_url']->storeOnCloudinary('Questence-Passports');
                $data['image_url'] = $uploader->getSecurePath();
            }*/

            if (! $user) {
                return formatResponse(404, 'User record not found', false);
            }

            if (! $instructorProfile) {

                return formatResponse(404, 'Instructor record not found', false);

            } else {

                DB::transaction(function () use ($data, $instructorProfile, $user, $id) {
                    $instructorProfile->update($data);
                    $user->update($data);
                });
            }

            $profile = $this->getFullProfile($id);

            $this->sendNotification($user);

            return formatResponse(200, 'Instructor profile updated successfully.', true, $profile);

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function createInstructor($data) {

          try {
              $password = str_random(8);

              DB::transaction(function () use ($data, $password, &$user, &$profile) {
                  $user = User::create([
                      'first_name' => ucwords($data['first_name']),
                      'last_name' => ucwords($data['last_name']),
                      'phone_number' => $data['phone_number'],
                      'email' => $data['email'],
                      'email_verified_at' => Carbon::now(),
                      'password' => bcrypt($password),
                      'category' => 'INS',
                      'status' => '1'
                  ]);

                  $role = Role::where('name', '=', 'Instructor')->first();
                  $user->attachRole($role);

                  $data['user_id'] = $user->id;

                  /*if (! empty($input['image'])) {
                      $uploader = $input['image']->storeOnCloudinary('Questence-Passports');
                      $input['image_url'] = $uploader->getSecurePath();
                  }
                  */
                  $profile = InstructorProfile::create($data);
                  LearnerProfile::create($data);
              });

              $user_role = interpreteUserCategory($user->category);

              $success['first_name'] = $user->first_name;
              $success['last_name'] = $user->last_name;
              $success['email'] = $user->email;
              $success['phone_number'] = $user->phone_number;
              $success['gender'] = $profile->gender;
              $success['date_of_birth'] = $profile->date_of_birth;
              $success['user_role'] = $user_role;

              try {
                  Mail::to($user->email)->send(new InstructorWelcome($user));
                  Mail::to($user->email)->send(new InstructorApproved($user, $password));
              } catch (\Exception $e) {
                  Log::error('Instructor account created successfully, but unable to send email to User. Please check your network connectivity.');
              }

              return formatResponse(201, 'Instructor Account Created Successfully.', true, $success);

          } catch (Exception $e) {
              return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
          }
    }
}
