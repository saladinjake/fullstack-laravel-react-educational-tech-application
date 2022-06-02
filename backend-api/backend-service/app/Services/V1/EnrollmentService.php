<?php

namespace App\Services\V1;

use App\Models\Enrollment;
use App\Models\Subscription;
use App\Models\BusinessProfile;
use App\Models\BusinessMember;
use App\Models\BusinessCourse;
use App\Models\Bundle;
use App\Models\User;
use App\Models\Course;
use App\Models\UserOrder;
use App\Services\BaseService;
use Exception;
use DB;
use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\UserEnrollment;
use App\Mail\BusinessEnrollment;
use App\Mail\AssignedCourse;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CourseEnrollmentNotification;


class EnrollmentService extends BaseService
{
    public function fetchAll()
    {
        try {
            $enrollments = Enrollment::with('user', 'course')->latest()->paginate(15);
            if (! $enrollments) {
                return formatResponse(200, 'No enrollment record found', true);
            } else {
                return formatResponse(200, 'Enrollments retrieved successfully', true, $enrollments);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        try {
            $checker = Enrollment::where(['id' => $id])->first();

            if (! $checker) {
                return formatResponse(404, 'Enrollment doesn\'t exist!', false);
            } else {

                $enrollment = Enrollment::where(['id' => $id])->with('user', 'course')->first()->makeHidden(['user_id','course_id','subscription_id']);

                $enrollment['instructor_details'] = $this->getUserDetails($enrollment->course->instructor_id)->makeHidden(['id']);

                return formatResponse(200, 'Enrollment details retrieved successfully', true, $enrollment);
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getUserEnrollments()
    {
        try {
            $currentUser = $this->getLoggedInUser();
            if (User::where('id', $currentUser['0'])->exists()) {
                $enrollments = $this->getEnrollment($currentUser['0'])->with('course')->latest()->paginate(15)->makeHidden(['user_id','course_id','subscription_id']);

                return formatResponse(200, 'User enrollments retrieved successfully', true, $enrollments);
            } else {
                return formatResponse(404, 'User not found', false);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getBusinessEnrollments()
    {
        try {
            $currentUser = $this->getLoggedInUser();
            $business = $this->getBusiness($currentUser['0']);

            if (! $currentUser){
                return formatResponse(404, 'User not found', false);
            } elseif (! $business){
                return formatResponse(404, 'Business record not found', false);
            } else {
                $enrollment = BusinessCourse::where(['business_id' => $business->id])->first();

                if (! $enrollment){
                    return formatResponse(200, 'No business enrollment record found', true);
                } else {
                    $enrollments = BusinessCourse::where(['business_id' => $business->id])->with('course', 'subscription')->latest()->paginate(15)->makeHidden(['business_id','course_id', 'subscription_id']);

                    return formatResponse(200, 'Business enrollments retrieved successfully', true, $enrollments);
                }
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getAllBusinessEnrollments($id)
    {
        try {

            $enrollment = BusinessCourse::where(['business_id' => $id])->first();

            if (! $enrollment){
                return formatResponse(200, 'No business enrollment record found', true);
            } else {
                $enrollments = BusinessCourse::where(['business_id' => $id])->with('course', 'subscription')->latest()->paginate(15);

                $enrollments['business'] = $this->getBusiness($id);

                return formatResponse(200, 'Business enrollments retrieved successfully', true, $enrollments);
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function create($data)
    {
        try {
            $course = $this->getCourse($data['course_id']);
            $currentUser = $this->getLoggedInUser();
            $reference = $this->getRef();
            $user = $this->getLoggedUser();

            $checker = Enrollment::where(['user_id' => $currentUser['0'], 'course_id' => $course->id])->first();
            if (! $currentUser){
                return formatResponse(404, 'Oh Snap! User doesn\'t exist!', false);
            } elseif ($checker){
                return formatResponse(400, 'Oh Snap! You have already enrolled to this course!', false);
            } elseif (! $user->hasRole(['user', 'instructor', 'superadmin', 'admin'])) {
                return formatResponse(403, 'Forbidden. You do not have access to this resource.', false);
            } else {

                DB::transaction(function () use ($data, $course, $reference, $currentUser, &$enrollment) {
                    $subscription = Subscription::create([
                        'user_id' => $currentUser['0'],
                        'course_id' => $course->id,
                        'business_profile_id' => 1,
                        'reference' => $reference,
                        'amount' => $course->price,
                    ]);

                    $enrollment = Enrollment::create([
                        'user_id' => $currentUser['0'],
                        'course_id' => $course->id,
                        'subscription_id' => $subscription->id,
                        'start_date' => Carbon::today('Africa/Lagos'),
                        'end_date' => Carbon::today('Africa/Lagos')->addYears(5)
                    ]);
                });

                $success = Enrollment::where(['id' => $enrollment->id])->with('course', 'subscription')->first();

                try {
                    Mail::to($user->email)->send(new UserEnrollment($user, $course));
                } catch (\Exception $e) {
                    Log::error('Enrollment created successfully, but unable to send email to User. Please check your network connectivity.');
                }

                return formatResponse(201, 'Course enrollment successful!', true, $success);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function createForBusiness($data)
    {
        try {

            $user = User::with('businessProfile')->find(Auth::id());
            if (is_null($user->businessProfile->id)) {
                return formatResponse(404, 'Oh Snap! Business doesn\'t exist!', false);
            }
            $course = $this->getCourse($data['course_id']);
            $currentUser = $this->getLoggedInUser();
            $reference = $this->getRef();

            $checker = Enrollment::where(['user_id' => $currentUser, 'course_id' => $course->id])->first();
            if (! $currentUser){
                return formatResponse(404, 'Oh Snap! User doesn\'t exist!', false);
            } elseif ($checker){
                return formatResponse(400, 'Oh Snap! You have already enrolled to this course!', false);
            } elseif (! $user->hasRole(['business'])) {
                return formatResponse(403, 'Forbidden. You do not have access to this resource.', false);
            } else {

                DB::transaction(function () use ($data, $course, $user, $reference, $currentUser, &$slots) {
                    $subscription = Subscription::create([
                        'user_id' => $currentUser['0'],
                        'course_id' => $course->id,
                        'business_profile_id' => $user->businessProfile->id,
                        'reference' => $reference,
                        'amount' => $course->price,
                    ]);

                    $enrollment = Enrollment::create([
                        'user_id' => $currentUser['0'],
                        'course_id' => $course->id,
                        'subscription_id' => $subscription->id,
                        'start_date' => Carbon::today('Africa/Lagos'),
                        'end_date' => Carbon::today('Africa/Lagos')->addYears(5)
                    ]);

                    $slots = BusinessCourse::create([
                        'business_id' => $user->businessProfile->id,
                        'course_id' => $course->id,
                        'subscription_id' => $subscription->id,
                        'no_of_slots' => $data['no_of_slots']
                    ]);
                });

                $success = BusinessCourse::where(['business_id' => $slots->business_id, 'course_id' => $slots->course_id])->with('course', 'subscription')->first();

                try {
                    Mail::to($user->email)->send(new BusinessEnrollment($user, $course));
                } catch (\Exception $e) {
                    Log::error('Enrollment created successfully, but unable to send email to User. Please check your network connectivity.');
                }

                return formatResponse(201, 'Course enrollment successful!', true, $success);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function assignCourse($data)
    {
        try {
            $currentUser = $this->getLoggedInUser();
            $business = $this->getBusiness($currentUser['0']);
            $user = User::with('businessProfile')->find(Auth::id());

            $user_id = $data['user_id'];
            $course_id = $data['course_id'];

            if (! $currentUser){
                return formatResponse(404, 'User not found', false);
            } elseif (! $business){
                return formatResponse(404, 'Business record not found', false);
            } elseif (! $user->hasRole(['business'])) {
                return formatResponse(403, 'Forbidden. You do not have access to this resource.', false);
            } else {
                $enrollment = BusinessCourse::where(['business_id' => $business->id])->first();
                $courseEnrollment = BusinessCourse::where(['business_id' => $business->id, 'course_id' => $course_id])->first();
                $member = BusinessMember::where(['business_id' => $business->id, 'user_id' => $user_id])->first();
                $enrollmentChecker = Enrollment::where(['course_id' => $course_id, 'user_id' => $user_id])->first();

                if (! $enrollment){
                    return formatResponse(404, 'No business enrollment record found', false);
                } elseif (! $courseEnrollment) {
                    return formatResponse(404, 'Oh Snap! Course enrollment record not found for this business', false);
                } elseif (! $member) {
                    return formatResponse(404, 'Oh Snap! Provided Member record not found for this business.', false);
                } elseif ($enrollmentChecker) {
                    return formatResponse(422, 'Oh Snap! Member already enrolled for this course.', false);
                } elseif (($courseEnrollment->used_slot >= $courseEnrollment->no_of_slots) OR ($courseEnrollment->no_of_slots == 0)) {
                    return formatResponse(422, 'Oh Snap! You have exhaused your available slots', false);
                } else {


                    DB::transaction(function () use ($user_id, $course_id, $courseEnrollment, &$enrollment) {
                        $enrollment = Enrollment::create([
                            'user_id' => $user_id,
                            'course_id' => $course_id,
                            'subscription_id' => $courseEnrollment->subscription_id,
                            'start_date' => Carbon::today('Africa/Lagos'),
                            'end_date' => Carbon::today('Africa/Lagos')->addYears(5)
                        ]);

                        // $newSlots = $courseEnrollment->no_of_slots - 1;
                        // $usedSlots = $courseEnrollment->used_slot + 1;

                        $courseEnrollment->update(['no_of_slots' => $courseEnrollment->no_of_slots--, 'used_slot' => $courseEnrollment->used_slot++]);
                    });

                    $enrolledUser = $this->getEnrolledUser($enrollment->user_id);
                    $enrolledCourse = $this->getCourse($enrollment->course_id);

                    try {
                        Mail::to($enrolledUser->email)->send(new AssignedCourse($enrolledUser, $enrolledCourse, $business));
                    } catch (\Exception $e) {
                        Log::error('Member enrolled successfully, but unable to send email to User. Please check your network connectivity.');
                    }

                    $success = Enrollment::where(['id' => $enrollment->id])->with('course', 'subscription')->first();

                    return formatResponse(201, 'Member Enrolled Successfully', true, $success);
                }
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function createMultiple($data)
    {
        try {
            $currentUser = $this->getLoggedInUser();
            $business = $this->getBusiness($currentUser['0']);
            $user = User::with('businessProfile')->find(Auth::id());

            // $user_id = $data['user_id'];
            // $course_id = $data['course_id'];

            $counter = count($data['enrollments']);

            if (! $currentUser){
                return formatResponse(404, 'User not found', false);
            } elseif (! $business){
                return formatResponse(404, 'Business record not found', false);
            } elseif (! $user->hasRole(['business'])) {
                return formatResponse(403, 'Forbidden. You do not have access to this resource.', false);
            } else {
                $enrollment = BusinessCourse::where(['business_id' => $business->id])->first();
                $courseEnrollment = BusinessCourse::where(['business_id' => $business->id, 'course_id' => $data['course_id']])->first();

                if (! $enrollment){
                    return formatResponse(404, 'No business enrollment record found', false);
                } elseif (! $courseEnrollment) {
                    return formatResponse(404, 'Oh Snap! Course enrollment record not found for this business', false);
                } elseif ($counter < 2) {
                    return formatResponse(422, 'Oh Snap! An error occured. Minimum of 2 members required to access this resource.', false);
                } else {

                    // DB::transaction(function () use ($data, $courseEnrollment, &$enrollment, $business) {
                        foreach ($data['enrollments'] as $enrol) {

                            $member = BusinessMember::where(['business_id' => $business->id, 'user_id' => $enrol['user_id']])->first();
                            $enrollmentChecker = Enrollment::where(['course_id' => $data['course_id'], 'user_id' => $enrol['user_id']])->first();

                            if (! $member) {
                                return formatResponse(404, 'Oh Snap! Provided Member record not found for this business.', false);
                            } elseif ($enrollmentChecker) {
                                return formatResponse(422, 'Oh Snap! User with ID '.$enrollmentChecker->user_id.' already enrolled for this course.', false);
                            } elseif (($courseEnrollment->used_slot >= $courseEnrollment->no_of_slots) OR ($courseEnrollment->no_of_slots == 0)) {
                                return formatResponse(422, 'Oh Snap! You have exhaused your available slots', false);
                            } else {

                                DB::beginTransaction();

                                $enrollment = Enrollment::create([
                                    'user_id' => $enrol['user_id'],
                                    'course_id' => $data['course_id'],
                                    'subscription_id' => $courseEnrollment->subscription_id,
                                    'start_date' => Carbon::today('Africa/Lagos'),
                                    'end_date' => Carbon::today('Africa/Lagos')->addYears(5)
                                ]);

                                DB::commit();

                                $newSlots = $courseEnrollment->no_of_slots - 1;
                                $usedSlots = $courseEnrollment->used_slot + 1;

                                $courseEnrollment->update(['no_of_slots' => $newSlots, 'used_slot' => $usedSlots]);

                                $enrolledUser = $this->getEnrolledUser($enrollment->user_id);
                                $enrolledCourse = $this->getCourse($enrollment->course_id);

                                try {
                                    Mail::to($enrolledUser->email)->send(new AssignedCourse($enrolledUser, $enrolledCourse, $business));
                                } catch (\Exception $e) {
                                    Log::error('Member enrolled successfully, but unable to send email to User. Please check your network connectivity.');
                                }
                            }
                        }
                    // });

                    return formatResponse(201, 'Members Enrolled Successfully', true);
                }
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function learnerEnrolMultiple($data)
    {
        try {
            $currentUser = $this->getLoggedInUser();
            $counter = count($data['enrollments']);
            $user = $this->getLoggedUser();

            if (! $currentUser){
                return formatResponse(404, 'User not found', false);
            } elseif (! $user->hasRole(['user', 'instructor', 'superadmin', 'admin'])) {
                return formatResponse(403, 'Forbidden. You do not have access to this resource.', false);
            } elseif ($counter < 1) {
                return formatResponse(422, 'Oh Snap! An error occured. Minimum of 1 courses required to access this resource.', false);
            } else {

                $error = 0;
                $flag = '';

                foreach ($data['enrollments'] as $enrol) {
                    $enrollment = Enrollment::where(['course_id' => $enrol['course_id'], 'user_id' => $currentUser['0']])->first();

                    if ($enrollment){
                        $error++;
                        $flag = $enrol['course_id'].',';
                    }

                }

                if ($error > 0){
                    return formatResponse(422, 'Oh Snap! An error occured! Learner already enrolled for course(s) with ID: '.$flag.' Please review and try again.', false);
                } else {

                    foreach ($data['enrollments'] as $enrol) {

                        $course = $this->getCourse($enrol['course_id']);
                        $reference = $this->getRef();

                        DB::beginTransaction();

                            $subscription = Subscription::create([
                                'user_id' => $currentUser['0'],
                                'course_id' => $enrol['course_id'],
                                'business_profile_id' => 1,
                                'reference' => $reference,
                                'amount' => $course->price,
                            ]);

                            $enrollment = Enrollment::create([
                                'user_id' => $currentUser['0'],
                                'course_id' => $enrol['course_id'],
                                'subscription_id' => $subscription->id,
                                'start_date' => Carbon::today('Africa/Lagos'),
                                'end_date' => Carbon::today('Africa/Lagos')->addYears(5)
                            ]);

                            $this->sendLearnerNotification($currentUser['0'], $enrol['course_id']);

                        DB::commit();

                        try {
                            Mail::to($user->email)->send(new UserEnrollment($user, $course));
                        } catch (\Exception $e) {
                            Log::error('Enrollment created successfully, but unable to send email to User. Please check your network connectivity.');
                        }
                    }

                    return formatResponse(201, 'Courses Enrolled Successfully', true);
                }
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function sendLearnerNotification($user, $course)
    {
      $user = User::find($user);
      $course = Course::find($course);
        $notif = [
          'greeting' => "Congratulations $user->first_name",
          'body' => "You have successfully enrolled for $course->course_name",
          'thanks' => 'Time to get busy.',
          'actionText' => 'View Courses',
          'actionURL' => url('/enrollments/me'),
          'user_id' => $user->id
        ];
        try {
        return Notification::send($user, new CourseEnrollmentNotification($notif));
      } catch (\Exception $e) {
          Log::error('Enrollment created successfully, but unable to send Notification to User. Please check your network connectivity.');
      }
    }

    public function update($id, $data)
    {
        try {
            $enrollment = Enrollment::find($id);
            if (! $enrollment) {
                return formatResponse(404, 'Enrollment doesn\'t exist!', false);
            } else {

                $enrollment->update([
                    'lms_enrollment_id' => $data['lms_enrollment_id']
                ]);
                return formatResponse(200, 'Enrollment details updated successfully', true, $enrollment);
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function delete($id, $data = null)
    {
        //
    }

    public function restore($id, $data = null)
    {
       //
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

    public function getLoggedUser()
    {
        $user = User::where(['id' => Auth::id()])->first();

        return $user;
    }

    public function getCourse($id)
    {
        $course = Course::where(['id' => $id])->first();

        return $course;
    }

    public function getEnrollment($id)
    {
        $course = Enrollment::where(['user_id' => $id]);

        return $course;
    }

    public function getUser($id)
    {
        $user = User::where(['id' => $id])->pluck('id');

        return $user;
    }

    public function getUserDetails($id)
    {
        $user = User::where(['id' => $id])->with('instructorProfile')->first();

        return $user;
    }

    public function getBusiness($id)
    {
        $business = BusinessProfile::where(['user_id' => $id])->first();

        return $business;
    }

    public function getRef()
    {
        $gen = floor(mt_rand() * 1000) + 1;
        $merchant_reference = 'Questence-Order-'.date('Ymdhis').'-'.$gen;

        return $merchant_reference;
    }

    public function getSlots($subscription_id)
    {
        $enrollment = BusinessCourse::where(['subscription_id' => $subscription_id])->first();

        return $enrollment;
    }

    public function getSubscription($id)
    {
        $subscription = Subscription::where(['id' => $id])->first();

        return $subscription;
    }

    public function getEnrolledUser($id)
    {
        $user = User::where(['id' => $id])->first();

        return $user;
    }

}
