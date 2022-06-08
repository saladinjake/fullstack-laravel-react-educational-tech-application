<?php

namespace App\Http\Controllers\V1;

use App\Models\Enrollment;
use App\Services\V1\EnrollmentService;
use Illuminate\Routing\Controller;
use App\Http\Requests\CreateEnrollmentRequest;
use App\Http\Requests\CreateAssignCourseRequest;
use App\Http\Requests\CreateBusinessEnrollmentRequest;
use App\Http\Requests\CreateMultipleEnrollmentRequest;
use App\Http\Requests\CreateLearnerMultipleEnrollmentRequest;

class EnrollmentController extends Controller
{
    public $enrollment;

    public function __construct(EnrollmentService $enrollmentService)
    {
        $this->enrollment = $enrollmentService;
    }

    /**
     * @OA\Get(
     *       path="/enrollments",
     *      operationId="getEnrollments",
     *      tags={"Enrollments"},
     *      summary="Authority: Superadmin | Gets all enrollments",
     *      description="Retrieves all enrollments and subscriptions",
     *      @OA\Response(
     *          response=200,
     *          description="Enrollments retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Enrollment")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     *    )
     */
    public function index()
    {
        return $this->enrollment->fetchAll();
    }

    /**
     * @OA\Get(
     *     path="/enrollments/{enrollmentId}",
     *      operationId="showEnrollment",
     *     tags={"Enrollments"},
     *     summary="Authority: Superadmin|Admin|Instructor|Business | Get details of an enrollment",
     *     description="Get detailed and granular information about the enrollment",
     *     @OA\Parameter(
     *        name="enrollmentId",
     *        description="Enrollment ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *        response=200,
     *        description="Enrollment details retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/EnrollmentDetails")
     *     ),
     *     @OA\Response(response="404", description="Resource not found"),
     *     @OA\Response(response="422", description="The given data was invalid.")
     * )
     */
    public function show($id)
    {
        return $this->enrollment->fetchOne($id);
    }

    /**
     * @OA\Get(
     *     path="/enrollments/me",
     *     operationId="showUserEnrollments",
     *     tags={"Enrollments"},
     *     summary="Authority: Superadmin, Admin, Learner, Instructor, Business | Get enrollments of the currently authenticated user",
     *     description="Retrieve all course enrollments of the logged in user.",
     *     @OA\Response(
     *        response=200,
     *        description="Course enrollments retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/Enrollment")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getUserEnrollments()
    {
        return $this->enrollment->getUserEnrollments();
    }

    /**
     * @OA\Get(
     *     path="/business/enrollments/me",
     *     operationId="showBusinessEnrollments",
     *     tags={"Business"},
     *     summary="Authority: Business | Get enrollments of the currently authenticated business",
     *     description="Retrieve all course enrollments of the logged in business.",
     *     @OA\Response(
     *        response=200,
     *        description="Business enrollments retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/BusinessEnrollment")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getBusinessEnrollments()
    {
        return $this->enrollment->getBusinessEnrollments();
    }

    /**
     * @OA\Get(
     *     path="/enrollments/business/{businessId}",
     *     operationId="showAllBusinessEnrollments",
     *     tags={"Enrollments"},
     *     summary="Authority: Superadmin | Get enrollments of a businesses",
     *     description="Retrieve all enrollments of a businesses",
     *     @OA\Response(
     *        response=200,
     *        description="Business enrollments retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/BusinessEnrollment")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getAllBusinessEnrollments($id)
    {
        return $this->enrollment->getAllBusinessEnrollments($id);
    }

    /**
     * @OA\Post(
     *       path="/enrollments/enrol",
     *      operationId="createEnrollment",
     *      tags={"Enrollments"},
     *      summary="Authority: Learner | Enroll to a course",
     *      description="Enrol a user to a course",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateEnrollmentRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Course enrollment successfully",
     *          @OA\JsonContent(ref="#/components/schemas/EnrollmentDetails")
     *      ),
     *      @OA\Response(
     *          response="403", 
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateEnrollmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateEnrollmentRequest $request)
    {
        return $this->enrollment->create($request->validated());
    }

    /**
     * @OA\Post(
     *       path="/enrollments/enrol/learnerEnrolMultiple",
     *      operationId="createLearnerMultipleEnrollment",
     *      tags={"Enrollments"},
     *      summary="Authority: Learner | Enroll learner to several courses",
     *      description="Enrol learner to multiple courses at once",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateLearnerMultipleEnrollmentRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Learner enrolled to courses successfully",
     *          @OA\JsonContent(ref="#/components/schemas/EnrollmentDetails")
     *      ),
     *      @OA\Response(
     *          response="403", 
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateLearnerMultipleEnrollmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function learnerEnrolMultiple(CreateLearnerMultipleEnrollmentRequest $request)
    {
        return $this->enrollment->learnerEnrolMultiple($request->validated());
    }

    /**
     * @OA\Post(
     *       path="/enrollments/create",
     *      operationId="createBusinessEnrollment",
     *      tags={"Enrollments"},
     *      summary="Authority: Superadmin, Admin, Instructor, Business | Enroll to a course",
     *      description="Enrol a user to a course",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateBusinessEnrollmentRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Course enrollment successfully",
     *          @OA\JsonContent(ref="#/components/schemas/EnrollmentDetails")
     *      ),
     *      @OA\Response(
     *          response="403", 
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateBusinessEnrollmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function storeForBusiness(CreateBusinessEnrollmentRequest $request)
    {
        return $this->enrollment->createForBusiness($request->validated());
    }

    /**
     * @OA\Post(
     *       path="/enrollments/enrolMultiple",
     *      operationId="createMultipleEnrollment",
     *      tags={"Enrollments"},
     *      summary="Authority: Business | Enroll several learners to a course",
     *      description="Enrol multiple learners to a course at once",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateMultipleEnrollmentRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Memebers enrolled to course successfully",
     *          @OA\JsonContent(ref="#/components/schemas/EnrollmentDetails")
     *      ),
     *      @OA\Response(
     *          response="403", 
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateMultipleEnrollmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function createMultiple(CreateMultipleEnrollmentRequest $request)
    {
        return $this->enrollment->createMultiple($request->validated());
    }

    /**
     * @OA\Post(
     *       path="/enrollments/assignCourse",
     *      operationId="assignCourse",
     *      tags={"Enrollments"},
     *      summary="Authority: Business | Assign a course to a learner",
     *      description="Assign a course to a learner",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateAssignCourseRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Course assigned successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Enrollment")
     *      ),
     *      @OA\Response(
     *          response="403", 
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateAssignCourseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function assignCourse(CreateAssignCourseRequest $request)
    {
        return $this->enrollment->assignCourse($request->validated());
    }
    
    /**
   * @OA\Put(
   *     path="/enrollments/update/{enrollmentId}",
   *     tags={"Enrollments"},
   *     summary="Authority: Superadmin, Admin, Instructor, Business | Update an Enrollment",
   *     @OA\Parameter(
   *        name="id",
   *        description="Enrollment ID",
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
   *                     property="lms_enrollment_id",
   *                     type="string",
   *                 ),
   *                 example={"lms_enrollment_id":"ENR|2019EnrollmentCode"}
   *             )
   *         )
   *     ),
   *     @OA\Response(response="200", description="Enrollment updated successfully"),
   *     @OA\Response(response="400", description="Bad Request"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
    public function updateEnrollment($id, UpdateEnrollmentRequest $request)
    {
        return $this->enrollment->update($id, $request->validated());
    }
}
