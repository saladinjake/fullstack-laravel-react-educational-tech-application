<?php

namespace App\Services\V1;

use App\Models\LearnerProfile;
use App\Models\User;
use App\Models\CoursePayment;
use App\Models\Language;
use App\Services\BaseService;
use App\Models\InstructorProfile;
use Exception;
use DB;
use Auth;
use Carbon\Carbon;
use App\Mail\UserWelcome;
use App\Mail\UserApproved;
use App\Mail\InstructorWelcome;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ProfileUpdateNotification;
use App\Notifications\LearnerUpgradeNotification;
use jeremykenedy\LaravelRoles\Models\Role;

class LearnerProfileService extends BaseService
{

    public function fetchAll()
    {
        try {
            $profile = config('roles.models.role')::where('name', 'User')->first()->users()->paginate(2);
            $counter = $profile->count();
            if ($counter < 1) {
                return formatResponse(200, 'No learner record found', true, $profile);
            } else {
                // $profiles = User::where(['category' => 'LRN'])->with('learnerProfile')->paginate(15);
                $profiles = config('roles.models.role')::where('name', 'User')->first()->setHidden(['pivot'])->users()->with('learnerProfile')->paginate(15)->makeHidden(['pivot']);
                return formatResponse(200, 'Learner profile(s) retrieved successfully', true, $profiles);
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
            } elseif (! $user->hasRole('user')) {
                return formatResponse(404, 'Provided user not found', false);
            } else {

                $profile = User::where('id', $id)->with('learnerProfile')->first();

                // $profile = DB::table('users')
                // ->join('learner_profiles', 'users.id', '=', 'learner_profiles.user_id')
                // ->where(['users.id' => $id])
                // ->first();

                return formatResponse(200, 'Learner profile retrieved successfully', true, $profile);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getLearnerProfile()
    {
        try {
            $currentUser = $this->getLoggedInUser();
            if (User::where('id', $currentUser['0'])->exists()) {
                $user = $this->getFullProfile($currentUser['0']);
                $completeness = $this->getProfileCompleteness($currentUser['0']);

                return formatResponse(200, 'Learner profile retrieved successfully', true, ['user' => $user, 'completeness' => $completeness]);
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
            $learner = $this->getLoggedInUser();

            $learnerProfile = $this->getProfile($learner['0']);
            $userProfile = $this->getUser($learner['0']);
            $lang = $this->getLanguage($data['language']);
            $data['language'] = $lang['0'];

            if (! empty($data['image'])) {
                $uploader = $data['image']->storeOnCloudinary('Questence-Passports');
                $data['image_url'] = $uploader->getSecurePath();
            }

            if (! $learnerProfile) {

                DB::transaction(function () use ($learner, $userProfile, $data) {
                    if (User::where(['id' => $learner['0']])->exists()) {
                        $data['user_id'] = $learner['0'];
                        $saveProfile = LearnerProfile::create($data);
                        $userProfile->update($data);
                    } else {
                        return formatResponse(404, 'User record not found', false);
                    }
                });

                $profile = $this->getFullProfile($learner['0']);

                return formatResponse(201, 'Learner profile created successfully.', true, $profile);

            } else {

                $profileUpdater = $learnerProfile->update($data);
                $userUpdater = $userProfile->update($data);

                if ($profileUpdater AND $userUpdater){

                    $learnerProfile = $this->getFullProfile($learner['0']);
                    return formatResponse(200, 'Learner profile updated successfully', true, $learnerProfile);

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
            $learner = $this->getLoggedInUser();
            $learnerProfile = $this->getProfile($id);
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

            if (! $learnerProfile) {

                DB::transaction(function () use ($learner, $user, $data) {
                    $data['user_id'] = $learner['0'];
                    $saveProfile = LearnerProfile::create($data);
                    $user->update($data);
                });

            } else {

                DB::transaction(function () use ($data, $learnerProfile, $user, $id) {
                    $learnerProfile->update($data);
                    $user->update($data);
                });
            }

            $profile = $this->getFullProfile($learner['0']);
            $this->sendNotification($user);

            return formatResponse(200, 'Learner profile updated successfully.', true, $profile);

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function updateProfile($data, $id) {
      try {
          $learnerProfile = $this->getProfile($id);
          $user = $this->getUser($id);

          $lang = $this->getLanguage($data['language']);
          $data['language'] = $lang['0'];

          /*if (! empty($data['image_url'])) {
              $uploader = $data['image_url']->storeOnCloudinary('Questence-Passports');
              $data['image_url'] = $uploader->getSecurePath();
          }*/

          if (! $user) {
              return formatResponse(404, 'User record not found', false);
          }

          if (! $learnerProfile) {

              return formatResponse(404, 'Learner record not found', false);

          } else {

              DB::transaction(function () use ($data, $learnerProfile, $user, $id) {
                  $learnerProfile->update($data);
                  $user->update($data);
              });
          }

          $profile = $this->getFullProfile($id);
          $this->sendNotification($user);

          return formatResponse(200, 'Learner profile updated successfully.', true, $profile);

      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function getMyPayments() {

      try {
         $learner = $this->getLoggedInUser();
         $learnerProfile = $this->getProfile($learner['0']);
         $course_payments = CoursePayment::with('businessProfile', 'courses')->where('learner_profile_id', $learnerProfile->id)->orderby('created_at', 'asc')->get();
         //$bundle_payments = BundlePayment::with('businessProfile', 'bundles')->where('learner_id', $learnerProfile->id)->orderby('created_at', 'asc')->get();
         if (! $course_payments) {
             return formatResponse(200, 'No Payment record found', true);
         } else {
             return formatResponse(200, 'Payments retrieved successfully', true, $course_payments);
         }
     } catch (Exception $e) {
         return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
     }
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

    public function activate($id, $data = null)
    {
        try {

            $learnerProfile = User::where(['id' => $id])->first();

            if (! $learnerProfile) {
                return formatResponse(404, 'Learner profile not found', false);
            } elseif (! $learnerProfile->hasRole('user')) {
                return formatResponse(422, 'Provided user not a learner!', false);
            } else {

                DB::beginTransaction();
                    $learnerProfile->update(['status' => '1']);
                DB::commit();

                return formatResponse(200, 'Learner profile activated successfully', true, $learnerProfile);
            }

        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function deactivate($id, $data = null)
    {
        try {

            $learnerProfile = User::where(['id' => $id])->first();

            if (! $learnerProfile) {
                return formatResponse(404, 'Learner profile not found', false);
            } elseif (! $learnerProfile->hasRole('user')) {
                return formatResponse(422, 'Provided user not a learner!', false);
            } else {

                DB::beginTransaction();
                    $learnerProfile->update(['status' => '-1']);
                DB::commit();

                return formatResponse(200, 'Learner profile deactivated successfully', true, $learnerProfile);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function deactivateProfile()
    {
        try {
            $learner = $this->getLoggedInUser();

            $learnerProfile = User::where(['id' => $learner['0']])->first();

            if (! $learnerProfile) {
                return formatResponse(404, 'Learner profile not found', false);
            } elseif (! $learnerProfile->hasRole('user')) {
                return formatResponse(422, 'Provided user not a learner!', false);
            } else {

                DB::beginTransaction();
                $role = Role::where('name', '=', 'User')->first();
                $learnerProfile->detachRole($role);
                    $learnerProfile->update(['status' => '-1']);
                DB::commit();

                return formatResponse(200, 'Learner profile deactivated successfully', true);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function active()
    {
        try {

            $learnerProfile = User::whereNotNull('email_verified_at')->where('status', '>=', '1')->whereHas('roles', function ($query) {
                $query->where('roles.name', 'User');
            })->first();

            if (! $learnerProfile) {
                return formatResponse(200, 'No Active learner profile found', true);
            } else {

                $activeProfiles = User::with('learnerProfile')->whereNotNull('email_verified_at')->where('status', '>=', '1')->whereHas('roles', function ($query) {
                    $query->where('roles.name', 'User');
                })->paginate(15);

                return formatResponse(200, 'Active Learner profiles retrieved successfully', true, $activeProfiles);
            }

        } catch (Exception $e) {

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function deactivated()
    {
        try {

            $learnerProfile = User::where('status', '-1')->whereHas('roles', function ($query) {
                $query->where('roles.name', 'User');
            })->first();

            if (! $learnerProfile) {
                return formatResponse(200, 'No Deactivated learner profile found', true);
            } else {

                $deactivatedProfiles = User::with('learnerProfile')->where('status', '-1')->whereHas('roles', function ($query) {
                    $query->where('roles.name', 'User');
                })->paginate(15);

                return formatResponse(200, 'Deactivated Learner profiles retrieved successfully', true, $deactivatedProfiles);
            }

        } catch (Exception $e) {

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function delete($id, $data = null)
    {
        try {

            $learnerProfile = LearnerProfile::where(['user_id' => $id])->first();

            if (! $learnerProfile) {
                return formatResponse(404, 'Learner profile not found', false);
            }

            DB::beginTransaction();
                $learnerProfile->delete();
            DB::commit();

            return formatResponse(200, 'Learner profile deleted successfully', true);
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
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
        return User::where(['id' => $userId])->with('learnerProfile')->first();
    }

    private function getProfileCompleteness(int $userId)
    {
      $columns = LearnerProfile::where('user_id', $userId)->first()->makeHidden(['id', 'status', 'created_at', 'updated_at', 'deleted_at'])->toArray();
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


    private function getProfile(int $userId)
    {
        return LearnerProfile::where(['user_id' => $userId])->first();
    }

    public function getLanguage($id)
    {
        $lang = Language::where(['id' => $id])->pluck('english');

        return $lang;
    }

    public function getRole()
    {
        $learnerRole = config('roles.models.role')::where('name', '=', 'User')->pluck('id');
    }

    public function createProfile($data) {
      try {
          $password = str_random(8);
          DB::transaction(function () use ($data, &$user, &$password) {
              $user = User::create([
                  'first_name' => ucwords($data['first_name']),
                  'last_name' => ucwords($data['last_name']),
                  'phone_number' => $data['phone_number'],
                  'email' => $data['email'],
                  'email_verified_at' => Carbon::now(),
                  'password' => bcrypt($password),
                  'category' => 'LRN',
                  'status' => '1'
              ]);

              $role = Role::where('name', '=', 'User')->first();
              $user->attachRole($role);

              $data['user_id'] = $user->id;
              $profile = LearnerProfile::create($data);
          });

          $user_roles = $user->roles;

          $success['first_name'] = $user->first_name;
          $success['last_name'] = $user->last_name;
          $success['email'] = $user->email;
          $success['phone_number'] = $user->phone_number;
          $success['user_roles'] = $user_roles->makeHidden(['id','description','pivot','level','slug','created_at','updated_at','deleted_at']);

          try {
              Mail::to($user->email)->send(new UserWelcome($user));
              Mail::to($user->email)->send(new UserApproved($user, $password));
          } catch (\Exception $e) {
              Log::error('User account created successfully, but unable to send email to User. Please check your network connectivity.');
          }
          return formatResponse(201, 'Learner Account Created Successfully.', true, $success);

      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function upgradeLearner($id) {
      $user = $this->getUser($id);
      if($user) {
        $role = $this->aRole('User');
        $user->detachRole($role);
      $instructor = InstructorProfile::where(['user_id' => $id])->first();
      if (! $instructor) {
        $role = $this->aRole('Instructor');
        $user->attachRole($role);
        $user->update([
          'category' => 'INS'
        ]);
        $instructor = InstructorProfile::create([
            'user_id' => $id,
            'status' => '1'
        ]);
      }
      $this->sendUpgradeNotification($user);

      return formatResponse(200, 'User upgraded', true, ['user' => $user, 'instructor_profile' => $instructor]);
      }
      return formatResponse(404, 'User not found', false);
    }

    public function aRole($user) {
      return Role::where('name', '=', $user)->first();
    }

    public function sendUpgradeNotification($user)
    {
        $notif = [
          'greeting' => "$user->first_name,",
          'body' => "You account has been upgraded and you have been given instructor rights. Please complete your Instructor Profile.",
          'thanks' => '',
          'actionText' => 'View',
          'actionURL' => url('/profile'),
          'user_id' => $user->id
        ];
        try {
        return Notification::send($user, new LearnerUpgradeNotification($notif));
      } catch (\Exception $e) {
          Log::error('Learner upgraded successfully, but unable to send Notification to User. Please check your network connectivity.');
      }
    }
}
