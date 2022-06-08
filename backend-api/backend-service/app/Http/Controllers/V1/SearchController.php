<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\V1\SearchService;
use App\Services\V1\CounterService;
use App\Models\Course;
use App\Models\User;

class SearchController extends Controller
{
  /**
   * @OA\Post(
   *     path="/courses",
   *     tags={"Search"},
   *     summary="Authority: None | Query Courses",
   *     @OA\RequestBody(
   *         @OA\MediaType(
   *             mediaType="application/json",
   *             @OA\Schema(
   *                @OA\RequestBody(
   *                    required=true,
   *                    content="application/json",
   *                 ),
   *                 @OA\Property(
   *                     property="course_name",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="course_code",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="learning_style",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="course_fee",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="certified",
   *                     type="string",
   *                 ),
   *                 example={"course_name":"How i met your Mother", "course_code":"HIMYM-101", "learning_style":"Self Paced", "course_fee":"0", "certified":"1"}
   *             )
   *         )
   *     ),
   *     @OA\Response(response="200", description="Course Retrieved Successfully"),
   * )
   */
   public function searchFilter(Request $request)
    {
        return SearchService::search($request);
    }

    /**
     * @OA\Get(
     *     path="/search/counters/superadminDashboard",
     *     tags={"Search"},
     *     summary="Authority: SuperAdmin | Fetch count of Total learners, Total Instructors, Total courses, Total businesses, Pending learners, Pending instructors,
     *     Pending courses, Pending businesses",
     *     @OA\Response(response="200", description="Count returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
   public function superadminCounter()
     {
        return CounterService::superadminCounter();
     }

     /**
      * @OA\Get(
      *     path="/search/courses/counter/{userId}",
      *     tags={"Search"},
      *     summary="Authority: Any | Fetch count of All Courses, Active Courses, Upcoming Courses, Expired Courses for user",
      *     @OA\Response(response="200", description="Count returned"),
      *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
      *     @OA\Response(response="403", description="Unauthorized. User not with access role")
      * )
      */
    public function learnerCounter($user_id) {
        return CounterService::courseCounter($user_id);
    }

    /**
     * @OA\Get(
     *     path="/search/mycourses/counter",
     *     tags={"Search"},
     *     summary="Authority: Any | Fetch count of Active Courses, Pending Courses, Deactivated Courses for Instructor",
     *     @OA\Response(response="200", description="Count returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
   public function instructorCounter() {
       return CounterService::instructorCounter();
   }

   /**
    * @OA\Get(
    *     path="/search/instructor/courses/counter/{userId}",
    *     tags={"Search"},
    *     summary="Authority: Any | Fetch count of courses created by Instructor",
    *     @OA\Response(response="200", description="Count returned"),
    *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
    *     @OA\Response(response="403", description="Unauthorized. User not with access role")
    * )
    */
   public function getCourseCount($userId) {
     return CounterService::getCourseCount($userId);
   }
  }
