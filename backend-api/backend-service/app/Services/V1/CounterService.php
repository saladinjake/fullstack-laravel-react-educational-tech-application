<?php

namespace App\Services\V1;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\User;
use App\Models\BusinessProfile;
use App\Models\InstructorProfile;
use Exception;
use DB;
use Carbon\Carbon;
use Auth;

class CounterService
{
  public static function superadminCounter() {
    $users = new User;
    $businesses = new BusinessProfile;
    $instructors = new InstructorProfile;
    $courses = new Course;

    $all_learners = $users->where('status', '1')->count();
    $pending_learners = $users->where('email_verified_at', null)->count();

    $all_instructors = $instructors->where('status', '1')->count();
    $pending_instructors = $instructors->where('status', '0')->count();

    $all_courses = $courses->where('status', '1')->count();
    $pending_courses = $courses->where('status', '0')->count();

    $all_businesses = $businesses->where('status', '1')->count();
    $pending_businesses = $businesses->where('status', '0')->count();

    return response()->json([
       'success' => true,
       'message' => "",
       'data' => [
         'total_learners' => $all_learners,
         'total_instructors' => $all_instructors,
         'total_courses' => $all_courses,
         'total_businesses' => $pending_businesses,
         'pending_learners' => $pending_learners,
         'pending_instructors' => $pending_instructors,
         'pending_courses' => $pending_courses,
         'pending_businesses' => $pending_businesses
       ]
   ], 200);

  }

  public static function courseCounter($user_id) {
    $enrollments   = DB::table('enrollments')->where('user_id', $user_id);
    $subscriptions = DB::table('subscriptions');
    $all_subscriptions = $subscriptions->where([['user_id', $user_id], ['status', '1']])->count();
    $upcoming_courses = Enrollment::where('user_id', $user_id)->whereHas('course', function ($query) {
        $query->where('start_date', '>=', Carbon::now());
    })->count();

    //$courses = $enrollments->get('course_id');
    //$upcoming_courses = $this->getUpcomingCourses($courses);

    return response()->json([
       'success' => true,
       'message' => "",
       'data' => [
         'all_enrollments' => $enrollments->count(),
         'all_subscriptions' => $all_subscriptions,
         'upcoming_courses' => $upcoming_courses
       ]
   ], 200);
  }

  public static function instructorCounter() {
    $user = User::find(Auth::id());
    $instructor_id = $user->instructorProfile->id;
    if($instructor_id) {
    $active_courses = Course::where(['status' => '1', 'instructor_id' => $instructor_id])->count();
    $pending_courses = Course::where(['status' => '0', 'instructor_id' => $instructor_id])->count();
    $deactivated_courses = Course::where(['status' => '-1', 'instructor_id' => $instructor_id])->count();
    $upcoming_courses = Course::where([['start_date', '>=', Carbon::now()], ['instructor_id', $instructor_id]])->count();

    return response()->json([
       'success' => true,
       'message' => "",
       'data' => [
         'active_courses' => $active_courses,
         'pending_courses' => $pending_courses,
         'deactivated_courses' => $deactivated_courses,
         'upcoming_courses' => $upcoming_courses
       ]
   ], 200);
  }
}

   public static function getCourseCount($userId) {
     $user = User::find($userId);
     if($user) {
     $courses = DB::table('course_instructors')->where('instructor_id', $userId)->count();

     return response()->json([
        'success' => true,
        'message' => "",
        'data' => [
          'courses' => $courses
        ]
    ], 200);
   }
   }


}
