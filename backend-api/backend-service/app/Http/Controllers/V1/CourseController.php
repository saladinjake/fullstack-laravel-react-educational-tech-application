<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCourseRequest;
use App\Models\BusinessProfile;
use App\Models\InstructorProfile;
use App\Models\Enrollment;
use App\Models\User;
use App\Models\Course;
use App\Models\TopCourse;
use App\Models\Curriculum;
use Image;
use DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Http\Requests\CreateTopCoursesRequest;
use App\Notifications\CourseCreationNotification;
use App\Notifications\CourseStatusNotification;
use Illuminate\Support\Facades\Notification;
use Auth;

class CourseController extends Controller
{

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */

  /**
   * @OA\Get(
   *     path="/courses",
   *     tags={"Courses"},
   *     summary="Authority: None | Fetch all courses",
   *     @OA\Response(response="200", description="List of all courses returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   * )
   */
  public function index()
  {
      $courses = Course::with('category', 'language', 'businesses', 'instructors', 'programmeLevels', 'certificates')->orderby('course_name', 'asc')->get();
      $counter = $courses->count();
      $message = $counter.' item(s) returned';

      return response()->json([
            'success' => true,
            'message' => $message,
            'data' => [
                'courses' => $courses,
                'counter' => $counter,
            ],
        ], 200);
  }

  /**
   * @OA\Get(
   *     path="/courses/topPicks",
   *     tags={"Courses"},
   *     summary="Authority: None | Fetch all top courses",
   *     @OA\Response(response="200", description="List of all top courses returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   * )
   */
  public function getTopCourses()
  {
      $courses = TopCourse::with('course')->get();
      $counter = $courses->count();
      $message = $counter.' item(s) returned';

      return response()->json([
            'success' => true,
            'message' => $message,
            'data' => [
                'courses' => $courses,
                'counter' => $counter,
            ],
        ], 200);
  }

  /**
   * @OA\Get(
   *     path="/courses/my/activeCourses",
   *     tags={"Courses"},
   *     summary="Authority: Instructor | Return list to Approved Courses of Authenticated Instructor",
   *     @OA\Response(response="200", description="Course details retrieved successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function myActiveCourses() {
    $user = User::find(Auth::id());
    $instructor_id = $user->instructorProfile->id;
    if($instructor_id) {
      $course = Course::with('category', 'instructors', 'language', 'businesses', 'certificates')->where('status', '1')->get();
      if (is_null($course)) {
          return response()->json([
              'error' => 'You have no approved courses',
          ], 404);
      } else {
          return response()->json([
          'success' => true,
          'message' => 'Approved Courses Retrieved Successfully.',
          'data' => $course
      ], 200);
      }
    }
  }

  /**
   * @OA\Get(
   *     path="/courses/my/deactivatedCourses",
   *     tags={"Courses"},
   *     summary="Authority: Instructor | Return list to Deactivated Courses of Authenticated Instructor",
   *     @OA\Response(response="200", description="Course details retrieved successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function myDeactivatedCourses() {
    $user = User::find(Auth::id());
    $instructor_id = $user->instructorProfile->id;
    if($instructor_id) {
      $course = Course::with('category', 'instructors', 'language', 'businesses', 'certificates')->where('status', '-1')->get();
      if (is_null($course)) {
          return response()->json([
              'error' => 'You have no deactivated courses',
          ], 404);
      } else {
          return response()->json([
          'success' => true,
          'message' => 'Deactivated Courses Retrieved Successfully.',
          'data' => $course
      ], 200);
      }
    }
  }

  /**
   * @OA\Get(
   *     path="/courses/my/pendingCourses",
   *     tags={"Courses"},
   *     summary="Authority: Instructor | Return list to Pending Courses of Authenticated Instructor",
   *     @OA\Response(response="200", description="Course details retrieved successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function myPendingCourses() {
    $user = User::find(Auth::id());
    $instructor_id = $user->instructorProfile->id;
    if($instructor_id) {
      $course = Course::with('category', 'instructors', 'language', 'businesses', 'certificates')->where('status', '0')->get();
      if (is_null($course)) {
          return response()->json([
              'error' => 'You have no pending courses',
          ], 404);
      } else {
          return response()->json([
          'success' => true,
          'message' => 'Pending Courses Retrieved Successfully.',
          'data' => $course
      ], 200);
      }
    }
  }


  /**
   * @OA\Get(
   *     path="/courses/activeCourses",
   *     tags={"Courses"},
   *     summary="Authority: SuperAdmin | Fetch all active courses",
   *     @OA\Response(response="200", description="List of all active courses is returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function activeCourses()
  {
      $active_courses = Course::where('status', '1')->get();
      $counter = $active_courses->count();
      $message = $counter.' Active Courses Retrieved Successfully';
      if (count($active_courses) < 1) {
          return response()->json([
           'message' => 'No Active Courses',
       ], 200);
      } else {
          return response()->json([
        'success' => true,
        'message' => $message,
        'data' => [
            'profiles' => $active_courses,
            'counter' => $counter,
        ],
    ], 200);
      }
  }

  /**
   * @OA\Get(
   *     path="/courses/deactivatedCourses",
   *     tags={"Courses"},
   *     summary="Authority: SuperAdmin | Fetch all deactivated Courses",
   *     @OA\Response(response="200", description="List of all deactivated Courses is returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */

  public function deactivatedCourses()
  {
      $deactivated_courses = Course::where('status', '-1')->get();
      $counter = $deactivated_courses->count();
      $message = $counter.' Deactivated Courses Retrieved Successfully';
      if (count($deactivated_courses) < 1) {
          return response()->json([
          'message' => 'No Deactivated Courses',
      ], 200);
      } else {
          return response()->json([
       'success' => true,
       'message' => $message,
       'data' => [
           'profiles' => $deactivated_courses,
           'counter' => $counter,
       ],
   ], 200);
      }
  }

  /**
   * @OA\Get(
   *     path="/courses/{courseId}/curriculum",
   *     tags={"Courses"},
   *     summary="Authority: Instructor | Fetch the Curriculum of a course",
   *     @OA\Response(response="200", description="List of topics in curriculum is returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */

  public function getCourseCurriculum($course_id) {
    $course = Course::where('id', $course_id)->first();
    if (is_null($course)) {
        return response()->json([
            'error' => 'Course Not found',
        ], 404);
    }
     else {
       $curriculum = Curriculum::with('subtopics')->whereNull('parent_id')->where('course_id', $course_id)->get();
       return response()->json([
       'success' => true,
       'message' => $curriculum->count()." topics returned",
       'data' => $curriculum
        ], 200);
     }
  }

  /**
   * @OA\Post(
   *     path="/courses/create",
   *     tags={"Courses"},
   *     summary="Authority: Instructor | Superadmin | Create a Course",
   *     description="Required fields are highlighted",
   *     @OA\RequestBody(
   *         @OA\MediaType(
   *             mediaType="application/json",
   *             @OA\Schema(
   *               required={"course_name", "learning_style", "duration", "language_id", "category_id", "course_description"},
   *                @OA\RequestBody(
   *                    required=true,
   *                    content="application/json",
   *                 ),
   *                 @OA\Property(
   *                     property="course_name",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="price",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="learning_style",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="duration",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="language_id",
   *                     type="integer",
   *                 ),
   *                 @OA\Property(
   *                     property="certificate_id",
   *                     type="integer",
   *                 ),
   *                 @OA\Property(
   *                     property="category_id",
   *                     type="integer"
   *                 ),
   *                 @OA\Property(
   *                     property="course_description",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="course_thumbnail",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="instructors",
   *                     type="array",
   *                     @OA\Items(
   *                         type="array",
   *                         @OA\Items()
   *                     ),
   *                 ),
   *                 @OA\Property(
   *                     property="business_id",
   *                     type="integer"
   *                 ),
   *                 @OA\Property(
   *                     property="introduction_video",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="start_date",
   *                     type="date"
   *                 ),
   *                 @OA\Property(
   *                     property="end_date",
   *                     type="date"
   *                 ),
   *                 @OA\Property(
   *                     property="enrollment_start",
   *                     type="date"
   *                 ),
   *                 @OA\Property(
   *                     property="enrollment_end",
   *                     type="date"
   *                 ),
   *                 @OA\Property(
   *                     property="course_overview",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="prerequisite_course",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="entrance_exam",
   *                     type="integer"
   *                 ),
   *                 @OA\Property(
   *                     property="license",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="overall_grade_range",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="grace_period_on_deadline",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="course_cover_image",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="topics",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="outcomes",
   *                     type="string",
   *                 ),
   *                 example={"course_name":"How I Met Your Mother", "price": "20000", "learning_style":"Self Paced", "duration":"20hours", "language_id":"64", "certificate_id":"1", "category_id":"1", "course_description":"Lorem Ipsum",
   *                 "course_thumbnail":"http://lorempixel.com/150/150/cats/image.jpg", "business_id":"1", "introduction_video":"http://shutterstock.com/video.mp4", "start_date": "2000-09-09",
   *                 "end_date":"2000-09-09", "enrollment_start":"2000-09-09", "enrollment_end":"2000-09-09", "course_overview":"Lorem Ipsum", "prerequisite_course": "Lorem Ipsum", "entrance_exam":"1",
   *                 "license":"MIT Open License 3.0", "overall_grade_range":"70", "grace_period_on_deadline":"24hours", "course_cover_image": "http://lorempixel.com/150/150/cats/image.jpg",
   *                 "instructors": "['1', '2']", "topics": "<p>Module 1 - Life</p>", "outcomes": "<p>How to Live</p>" }
   *             )
   *         )
   *     ),
   *     @OA\Response(response="200", description="Course created successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
   * )
   */
  public function createCourse(CreateCourseRequest $request)
  {
      $data = $request->validated();

      $course = Course::create([
      'course_code' => isset($data['course_code']) ? $data['course_code'] : NULL,
      'course_name' => $data['course_name'],
      'slug' => Str::slug($data['course_name']),
      'price' => $data['price'],
      'start_date' => $data['start_date'],
      'end_date' => $data['end_date'],
      'enrollment_start' => $data['enrollment_start'],
      'enrollment_end' => $data['enrollment_end'],
      'course_name' => $data['course_name'],
      'duration' => $data['duration'],
      'instructor_id' => Auth::id(),
      'business_id' => $data['business_id'],
      'category_id' => $data['category_id'],
      'certificate_id' => $data['certificate_id'],
      'language_id' => $data['language_id'],
      'learning_style' => $data['learning_style'],
      'course_description' => $data['course_description'],
      'course_overview' => $data['course_overview'],
      'course_thumbnail' => $data['course_thumbnail'],
      'introduction_video' => isset($data['introduction_video']) ? $data['introduction_video'] : NULL,
      'prerequisite_course' => $data['prerequisite_course'],
      'entrance_exam' => $data['entrance_exam'],
      'license' => $data['license'],
      'overall_grade_range' => $data['overall_grade_range'],
      'grace_period_on_deadline' => $data['grace_period_on_deadline'],
      'course_cover_image' => $data['course_cover_image'],
      'topics' => $data['topics'],
      'outcomes' => $data['outcomes']
    ]);
      $co_authors = $this->attachInstructors($data['instructors'], $course->id);

      //$curriculum = $this->createCurriculum($data['topics'], $course->id);
      if($course)
      $message = 'Course Created';
      $this->sendNotification(Auth::id(), $course->id, $course->course_name);

     return response()->json([
         'success' => true,
         'message' => $message,
         'data' => [
           'course' => $course,
           'instructors' => $course->instructors
         ]
     ], 200);
  }

  /**
   * @OA\Post(
   *     path="/courses/topPicks",
   *     tags={"Courses"},
   *     summary="Authority: Superadmin | Select the top courses",
   *      description="Choose top courses",
   *     @OA\RequestBody(
   *         @OA\MediaType(
   *             mediaType="application/json",
   *             @OA\Schema(
   *               required={"courses"},
   *                @OA\RequestBody(
   *                    required=true,
   *                    content="application/json",
   *                 ),
   *                 @OA\Property(
   *                      property="courses",
   *                      description="list of courses",
   *                      example="['2', '1']",
   *                      type="string"
   *                 ),
   *             )
   *         )
   *     ),
   *     @OA\Response(response="200", description="Top Course created successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
   * )
   */
  public function selectTopCourses(CreateTopCoursesRequest $request) {
    try {
    foreach ($request['courses'] as $course) {
      TopCourse::updateOrCreate([
        'course_id' => $course
      ],
      [
        'created_at' => Carbon::now()
      ]);
    }
    return formatResponse(201, 'Top Course created successfully', true);
  } catch (Exception $e) {
      return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
  }
  }

  /**
   * @OA\Delete(
   *     path="/topPicks/{courseId}/delete",
   *     tags={"Courses"},
   *     summary="Authority: SuperAdmin | Delete a top Course",
   *     @OA\Parameter(
   *        name="Id",
   *        description="ID of the course",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Course deleted successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function removeTopCourse($courseId) {
    $course = TopCourse::where('course_id', $courseId)->first();
    if (is_null($course)) {
        return response()->json([
          'error' => 'This Course does not exist',
      ], 404);
    } else {
        $course->delete();

        return response()->json([
          'success' => true,
          'message' => 'Course Deleted Successfully',
          'data' => $course,
      ], 200);
    }
  }

  public function createCurriculum($topics, $course_id) {
         $newtopics = json_decode($topics, true);
         foreach ($newtopics as $topic) {
           $this->checkTopicExists($course_id, $topic['title']);
         $curriculum = Curriculum::create([
           'course_id' => $course_id,
           'topic' => $topic['title'],
           'parent_id' => isset($topic['parent']) ?: NULL
          ]);
          }
           return true;
  }

  public function attachInstructors($data, $course_id) {
    $this->detachInstructors($course_id);
    $instructors = json_decode($data, true);
    foreach ($instructors as $instructor) {
     DB::table('course_instructors')->updateOrInsert(
      ['course_id' => $course_id, 'instructor_id' => $instructor],
      ['created_at' => Carbon::now()]);
     }
    return true;
  }

  public function detachInstructors($courseId) {
    $course = DB::table('course_instructors')->where('course_id', $courseId);
    $course->delete();
  }

  /**
   * @OA\Put(
   *     path="/courses/{courseId}",
   *     tags={"Courses"},
   *     summary="Authority: Instructor | Superadmin | Update a particular Course",
   *     @OA\Parameter(
   *        name="id",
   *        description="Course ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
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
   *                     property="lms_course_id",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="price",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="learning_style",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="duration",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="language_id",
   *                     type="integer",
   *                 ),
   *                 @OA\Property(
   *                     property="category_id",
   *                     type="integer"
   *                 ),
   *                 @OA\Property(
   *                     property="certificate_id",
   *                     type="integer"
   *                 ),
   *                 @OA\Property(
   *                     property="course_description",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="course_thumbnail",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="instructors",
   *                     type="array",
   *                     @OA\Items(
   *                         type="array",
   *                         @OA\Items()
   *                     ),
   *                 ),
   *                 @OA\Property(
   *                     property="introduction_video",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="start_date",
   *                     type="date"
   *                 ),
   *                 @OA\Property(
   *                     property="end_date",
   *                     type="date"
   *                 ),
   *                 @OA\Property(
   *                     property="enrollment_start",
   *                     type="date"
   *                 ),
   *                 @OA\Property(
   *                     property="enrollment_end",
   *                     type="date"
   *                 ),
   *                 @OA\Property(
   *                     property="course_overview",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="prerequisite_course",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="entrance_exam",
   *                     type="integer"
   *                 ),
   *                 @OA\Property(
   *                     property="license",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="overall_grade_range",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="grace_period_on_deadline",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="course_cover_image",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="topics",
   *                     type="string"
   *                 ),
   *                 @OA\Property(
   *                     property="outcomes",
   *                     type="string"
   *                 ),
   *                 example={"course_name":"How I Met Your Mother", "lms_course_id":"CRS|2019CourseName", "price":"20000", "learning_style":"Self Paced", "duration":"20hours", "language_id":"64", "category_id":"1", "certificate_id":"1", "course_description":"Lorem Ipsum",
   *                 "course_thumbnail":"http://shutterstock.com/image.jpg", "introduction_video":"http://shutterstock.com/video.mp4", "price":"10000", "start_date": "2000-09-09",
   *                 "end_date":"2000-09-09", "enrollment_start":"2000-09-09", "enrollment_end":"2000-09-09", "course_overview":"Lorem Ipsum", "prerequisite_course": "Lorem Ipsum", "entrance_exam":"1",
   *                 "license":"MIT Open License 3.0", "overall_grade_range":"70", "grace_period_on_deadline":"24hours", "course_cover_image": "http://lorempixel.com/150/150/cats/image.jpg",
   *                 "instructors": "['1', '2']", "topics": "<p>Module 1 - Life</p>", "outcomes": "<p>How to Live</p>" }
   *             )
   *         )
   *     ),
   *     @OA\Response(response="200", description="Course updated successfully"),
   *     @OA\Response(response="400", description="Bad Request"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function updateCourse(CreateCourseRequest $request, $course_id)
  {
    $user = User::where(['id' => Auth::user()->id])->first();
    $course = DB::table('course_instructors')->where(['instructor_id' => Auth::user()->id, 'course_id' => $course_id])->first();
    if($course || $user->hasRole('superadmin')) {
      $course = Course::find($course_id);

      $data = $request->validated();
      /*$banner = $course->course_cover_image;
      $course_thumbnail = $course->course_thumbnail;

      if ($request->hasFile('course_thumbnail')) {
        $thumbnail = $data['course_thumbnail'];
        $uploader = $thumbnail->storeOnCloudinary('Course-Thumbnails');
        $course_thumbnail = $uploader->getSecurePath();
      }
      if ($request->hasFile('course_cover_image')) {
        $thumbnail = $data['course_cover_image'];
        $uploader = $thumbnail->storeOnCloudinary('Course-Cover-Images');
        $banner = $uploader->getSecurePath();
      }*/

      $course->update([
        'course_code' => isset($data['course_code']) ? $data['course_code'] : NULL,
        'course_name' => $data['course_name'],
        'lms_course_id' => isset($data['lms_course_id']) ? $data['lms_course_id'] : NULL,
        'price' => $data['price'],
        'slug' => Str::slug($data['course_name']),
        'price' => $data['price'],
        'start_date' => $data['start_date'],
        'end_date' => $data['end_date'],
        'enrollment_start' => $data['enrollment_start'],
        'enrollment_end' => $data['enrollment_end'],
        'course_name' => $data['course_name'],
        'duration' => $data['duration'],
        'category_id' => $data['category_id'],
        'language_id' => $data['language_id'],
        'certificate_id' => $data['certificate_id'],
        'learning_style' => $data['learning_style'],
        'course_description' => $data['course_description'],
        'course_overview' => $data['course_overview'],
        'course_thumbnail' => $data['course_thumbnail'],
        'introduction_video' => isset($data['introduction_video']) ? $data['introduction_video'] : NULL,
        'prerequisite_course' => $data['prerequisite_course'],
        'entrance_exam' => $data['entrance_exam'],
        'license' => $data['license'],
        'overall_grade_range' => $data['overall_grade_range'],
        'grace_period_on_deadline' => $data['grace_period_on_deadline'],
        'course_cover_image' => $data['course_cover_image'],
        'topics' => $data['topics'],
        'outcomes' => $data['outcomes'],
        'status' => '0'
     ]);

     $co_authors = $this->attachInstructors($data['instructors'], $course_id);
     //$curriculum = $this->createCurriculum($data['topics'], $course_id);
     if($course)
         return response()->json([
           'success' => true,
           'message' => 'Course updated Successfully.',
           'data' => [
             'course' => $course,
             'instructors' => $course->instructors
           ]
       ], 200);
    }
      return response()->json([
          'error' => 'Course Not found',
      ], 404);
  }

  public function sendNotification($user_id, $course_id, $course_name)
  {
      $user = User::find($user_id);
      $notif = [
              'greeting' => 'Congratulations',
              'body' => "You have successfully created: '$course_name'.",
              'thanks' => 'Pending Review',
              'actionText' => 'View Course',
              'actionURL' => url("/courses/mycourses/$course_id"),
              'course_id' => $course_id,
              'user_id' => $user_id,
          ];
      try {
          Notification::send($user, new CourseCreationNotification($notif));
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */

  /**
   * @OA\Get(
   *     path="/courses/{courseId}",
   *     tags={"Courses"},
   *     summary="Authority: Any | Get details of a particular Course",
   *     description="Course ID is compulsory",
   *     @OA\Parameter(
   *        name="id",
   *        description="ID of the course",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Course details retrieved successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function show($course_id)
  {
      $course = Course::with('category', 'language', 'businesses', 'instructors', 'certificates')->find($course_id);
      if (is_null($course)) {
          return response()->json([
              'error' => 'Course does not exist',
          ], 404);
      } else {
          return response()->json([
          'success' => true,
          'message' => 'Course Retrieved Successfully.',
          'data' => $course
      ], 200);
      }
  }

  /**
   * @OA\Get(
   *     path="/courses/enrolled/users/{courseId}",
   *     tags={"Courses"},
   *     summary="Authority: Superadmin | Instructor | Get all users enrolled to a certain course",
   *     description="Course ID is compulsory",
   *     @OA\Parameter(
   *        name="id",
   *        description="ID of the course",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Course details retrieved successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function getEnrolledUsers($course_id) {
    $enrolled = Enrollment::with('course', 'user', 'subscription')->where(['course_id' => $course_id])->get();
    $counter = $enrolled->count();
    $message = $counter.' item(s) returned';

    return response()->json([
          'success' => true,
          'message' => $message,
          'data' => [
              'enrollment' => $enrolled
          ],
      ], 200);
  }


  /**
   * @OA\Put(
   *     path="/courses/{courseId}/activate",
   *     tags={"Courses"},
   *     summary="Authority: SuperAdmin | Activate a Course",
   *     @OA\Parameter(
   *        name="CourseId",
   *        description="ID of the course",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Course Activated successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function activate($course_id)
  {
      $course = Course::find($course_id);
      if (is_null($course)) {
          return response()->json([
                 'error' => 'This Course does not exist',
             ], 404);
      } else {
          $course->status = '1';
          $course->save();
          $message = 'Course has been activated';

          $this->sendConfirmationNotification($course->instructor_id, $course_id, $course->course_name, $course->status);

          return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $course,
        ], 200);
      }
  }

  public function archive($course_id) {

  }

  /**
   * @OA\Put(
   *     path="/courses/{courseId}/deactivate",
   *     tags={"Courses"},
   *     summary="Authority: SuperAdmin | Deactivate a course",
   *     @OA\Parameter(
   *        name="CourseId",
   *        description="ID of the course",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Course Deactivated successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function deactivate($course_id)
  {
      $course = Course::find($course_id);
      if (is_null($course)) {
          return response()->json([
                  'error' => 'This Course does not exist',
              ], 404);
      } else {
          $course->status = '-1';
          $course->save();
          $message = 'Course has been Deactivated';

          $this->sendConfirmationNotification($course->instructor_id, $course_id, $course->course_name, $course->status);

          return response()->json([
             'success' => true,
             'message' => $message,
             'data' => $course,
         ], 200);
      }
  }

  public function sendConfirmationNotification($instructor, $course_id, $course_name, $status)
  {
      $instructor = User::find($instructor);
     if($status == '1') {
      $notif = [
              'greeting' => 'Dear'. $instructor->first_name,
              'body' => "Your previously created course: '$course_name' has been approved",
              'thanks' => 'Congratulations',
              'actionText' => 'View Course',
              'actionURL' => url("/courses/mycourses/$course_id"),
              'course_id' => $course_id,
              'instructor_id' => $instructor->id,
          ];
      try {
          Notification::send($instructor, new CourseStatusNotification($notif));
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }
    elseif($status == '-1') {
      $notif = [
              'greeting' => 'Dear'. $instructor->first_name,
              'body' => "Your previously created course: '$course_name' has been disapproved",
              'thanks' => 'Pending further review.',
              'actionText' => 'View Course',
              'actionURL' => url("/courses/mycourses/$course_id"),
              'course_id' => $course_id,
              'instructor_id' => $instructor->id,
          ];
      try {
          Notification::send($instructor, new CourseStatusNotification($notif));
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }
    else {
      return response()->json([
                'error' => 'Cannot detect Course status',
          ], 500);
    }
  }

  /**
   * @OA\Delete(
   *     path="/courses/{id}/delete",
   *     tags={"Courses"},
   *     summary="Authority: SuperAdmin | Delete a Course",
   *     @OA\Parameter(
   *        name="Id",
   *        description="ID of the course",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Course deleted successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */

  public function destroy($id)
  {
      $course = Course::find($id);
      if (is_null($course)) {
          return response()->json([
            'error' => 'This Course does not exist',
        ], 404);
      } else {
          $course->delete();

          return response()->json([
            'success' => true,
            'message' => 'Course Deleted Successfully',
            'data' => $course,
        ], 200);
      }
  }

  /**
   * @OA\Patch(
   *     path="/courses/{id}/restore",
   *     tags={"Courses"},
   *     summary="Authority: SuperAdmin | Restore a deleted Course",
   *     @OA\Parameter(
   *        name="Id",
   *        description="ID of the course",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Course restored successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function restoreDeletedCourse($id)
    {
      $course = Course::onlyTrashed()->find($id);
      $course->restore();
      $message = 'Course Restored';
        return response()->json([
     'success' => true,
     'message' => $message,
     'data' => $course
 ], 200);
   }

   /**
    * @OA\Delete(
    *     path="/courses/{id}/erase",
    *     tags={"Courses"},
    *     summary="Authority: SuperAdmin | Delete a Course Permanently",
    *     @OA\Parameter(
    *        name="Id",
    *        description="ID of the course",
    *        required=true,
    *        in="path",
    *        @OA\Schema(
    *            type="integer"
    *        )
    *     ),
    *     @OA\Response(response="200", description="Course erased successfully"),
    *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
    *     @OA\Response(response="403", description="Unauthorized. User not with access role")
    * )
    */
  public function deletePermanently($id)
  {
    $course = Course::onlyTrashed()->find($id);
    $course->forceDelete();
    $message = 'Course Deleted Permanently';
      return response()->json([
   'success' => true,
   'message' => $message,
   'data' => $course
], 200);
  }

 /*
   public function batchRestore($ids)
     {
       $list = explode(',', $ids);
      foreach ($list as $id) {
        $course = Course::findOrFail($id);
      }
    }

    public function batchDelete($ids)
      {
        $list = explode(',', $ids);
       foreach ($list as $id) {
         $course = Course::findOrFail($id);
       }
     }
    */

  /**
   * @OA\Get(
   *     path="/courses/deletedCourses",
   *     tags={"Courses"},
   *     summary="Authority: SuperAdmin | Fetch all deleted courses",
   *     @OA\Response(response="200", description="List of all deleted courses returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function deletedCourses()
    {
        $courses = Course::withTrashed()->get();
        $counter = $courses->count();
        return response()->json([
          'success' => true,
          'message' => 'All deleted Courses returned successfully',
          'data' => [
              'courses' => $courses,
              'counter' => $counter,
          ],
      ], 200);
    }

    /**
     * @OA\Get(
     *     path="/courses/recycleBin",
     *     tags={"Courses"},
     *     summary="Authority: SuperAdmin | Fetch all courses in recycle bin",
     *     @OA\Response(response="200", description="List of all courses in recycle bin returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
  public function recycleBin() {
        $courses = Course::onlyTrashed()->get();
        $counter = $courses->count();
        return response()->json([
          'success' => true,
          'message' => 'Courses in Recycle Bin returned successfully',
          'data' => [
              'courses' => $courses,
              'counter' => $counter,
          ],
      ], 200);
    }

  public function checkTopicExists($course_id, $topic) {
    $topic = Curriculum::where(['course_id' => $course_id, 'topic' => $topic])->first();
    if($topic)
    $topic->delete();
  }
}
