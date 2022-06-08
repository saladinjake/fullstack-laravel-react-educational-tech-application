<?php

namespace App\Http\Controllers\V1;

use App\Models\InstructorProfile;
use App\Services\V1\InstructorProfileService;
use Illuminate\Routing\Controller;
use App\Http\Requests\CreateInstructorProfileRequest;
use App\Http\Requests\UpdateInstructorProfileRequest;
use App\Http\Requests\CreateInstructorRequest;

class InstructorProfileController extends Controller
{
    public $instructorProfile;

    public function __construct(InstructorProfileService $instructorProfileService)
    {
        $this->instructorProfile = $instructorProfileService;
    }

    /**
     * @OA\Get(
     *       path="/instructors",
     *      operationId="getInstructors",
     *      tags={"Instructors"},
     *      summary="Authority: Superadmin | Gets all instructors",
     *      description="Retrieves all instructor and their respective profiles",
     *      @OA\Response(
     *          response=200,
     *          description="Instructor profiles retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     *    )
     */
    public function index()
    {
        return $this->instructorProfile->fetchAll();
    }

    /**
     * @OA\Post(
     *       path="/instructors/profile",
     *      operationId="createInstructorProfile",
     *      tags={"Instructors"},
     *      summary="Authority: Instructor | Creates an instructor profile",
     *      description="Stores an instructor profile",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateInstructorProfileRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Instructor profile created",
     *          @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
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
     * @param  \Illuminate\Http\CreateInstructorProfileRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateInstructorProfileRequest $request)
    {
        return $this->instructorProfile->create($request->validated());
    }

    /**
     * @OA\Post(
     *       path="/instructors/create/profile",
     *      operationId="createInstructor",
     *      tags={"Instructors"},
     *      summary="Authority: Superadmin | Create a new instructor",
     *      description="Creates a new instructor account",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateInstructorRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Instructor account created successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Instructor")
     *      ),
     *      @OA\Response(
     *          response="400",
     *          description="Bad Request",
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateInstructorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function createProfile(CreateInstructorRequest $request) {
      return $this->instructorProfile->createInstructor($request->validated());
    }

    /**
     * @OA\Put(
     *      path="/instructors/profile/{userId}",
     *      operationId="updateInstructorProfile",
     *      tags={"Instructors"},
     *      summary="Authority: Instructor | Updates an instructor Profile | Please use x-www-form-urlencoded for body",
     *      description="Update Instructor Profile Information",
     *      @OA\Parameter(
     *        name="userId",
     *        description="User ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/UpdateInstructorProfileRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Instructor profile updated",
     *          @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *      ),
     *      @OA\Response(
     *          response="403",
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Instructor profile not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateInstructorProfileRequest  $request
     * @param  \App\Models\InstructorProfile  $instructorProfile
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInstructorProfileRequest $request, int $id)
    {
        return $this->instructorProfile->update($request->validated(), $id);
    }

    /**
     * @OA\Put(
     *      path="/instructors/{userId}/update",
     *      operationId="updateInstructorProfile",
     *      tags={"Instructors"},
     *      summary="Authority: Superadmin | Updates an instructor Profile | Please use x-www-form-urlencoded for body",
     *      description="Update Instructor Profile Information",
     *      @OA\Parameter(
     *        name="userId",
     *        description="User ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/UpdateInstructorProfileRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Instructor profile updated",
     *          @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *      ),
     *      @OA\Response(
     *          response="403",
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Instructor profile not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateInstructorProfileRequest  $request
     * @param  \App\Models\InstructorProfile  $instructorProfile
     * @return \Illuminate\Http\Response
     */
    public function updateInstructor(UpdateInstructorProfileRequest $request, int $id)
    {
        return $this->instructorProfile->updateInstructor($request->validated(), $id);
    }

    /**
     * @OA\Get(
     *     path="/instructors/{userId}",
     *     operationId="getInstructorProfile",
     *     tags={"Instructors"},
     *     summary="Authority: Any | Get detailed profile of an instructor",
     *     description="Detailed Profile of the specified instructor",
     *     @OA\Response(
     *        response=200,
     *        description="Instructor profile retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function show($id)
    {
        return $this->instructorProfile->fetchOne($id);
    }

    /**
     * @OA\Get(
     *     path="/instructors/my/profile",
     *     operationId="showInstructorProfile",
     *     tags={"Instructors"},
     *     summary="Authority: Instructor | Get profile of the currently authenticated instructor",
     *     description="Profile of the logged in instructor",
     *     @OA\Response(
     *        response=200,
     *        description="Instructor profile retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getInstructorProfile()
    {
        return $this->instructorProfile->getInstructorProfile();
    }

    /**
     * @OA\Get(
     *     path="/courses/my/courses",
     *     operationId="getMyCourses",
     *     tags={"Instructors"},
     *     summary="Authority: Instructor | Get list of courses created by authenticated instructor",
     *     description="Authored Courses of the logged in instructor",
     *     @OA\Response(
     *        response=200,
     *        description="Courses retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getCourses()
    {
      return $this->instructorProfile->getCourses();
    }

    /**
     * @OA\Get(
     *     path="/courses/mycourses/{courseId}",
     *     operationId="getCourse",
     *     tags={"Instructors"},
     *     summary="Authority: Instructor | Retrieve a Course",
     *     @OA\Parameter(
     *        name="courseId",
     *        description="Course ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Course Retrieved",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Course not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function getCourse(int $id)
    {
      return $this->instructorProfile->getCourse($id);
    }

    /**
     * @OA\Put(
     *     path="/instructors/{userId}/deactivate",
     *     operationId="deactivateInstructor",
     *     tags={"Instructors"},
     *     summary="Authority: Superadmin | Deactivates an instructor",
     *     @OA\Parameter(
     *        name="userId",
     *        description="Instructor ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Instructor profile deactivated",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Instructor profile not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function deactivate(int $id)
    {
        return $this->instructorProfile->deactivate($id);
    }

    /**
     * @OA\Put(
     *     path="/instructors/{userId}/activate",
     *     operationId="activateInstructor",
     *     tags={"Instructors"},
     *     summary="Authority: Superadmin | Activates an instructor",
     *     @OA\Parameter(
     *        name="userId",
     *        description="Instructor ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Instructor profile activated",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Instructor profile not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function activate(int $id)
    {
        return $this->instructorProfile->activate($id);
    }

    public function disapprove(int $id)
    {
        return $this->instructorProfile->disapprove($id);
    }

    /**
     * @OA\Get(
     *       path="/instructors/active/Profiles",
     *      operationId="activeInstructorProfile",
     *      tags={"Instructors"},
     *      summary="Authority: Any | Gets all active instructors",
     *      description="Retrieves all active instructors and their respective profiles",
     *      @OA\Response(
     *          response=200,
     *          description="Active Instructor profiles retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function activeProfiles()
    {
        return $this->instructorProfile->active();
    }

    /**
     * @OA\Get(
     *       path="/instructors/deactivated/Profiles",
     *      operationId="deactivedInstructorProfile",
     *      tags={"Instructors"},
     *      summary="Authority: Superadmin | Gets all deactivated instructors",
     *      description="Retrieves all deactivated instructors and their respective profiles",
     *      @OA\Response(
     *          response=200,
     *          description="Deactivated instructor profiles retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function deactivatedProfiles()
    {
        return $this->instructorProfile->deactivated();
    }

    /**
     * @OA\Get(
     *       path="/instructors/pending/Profiles",
     *      operationId="pendingInstructorProfile",
     *      tags={"Instructors"},
     *      summary="Authority: Superadmin | Gets all pending instructors",
     *      description="Retrieves all pending instructors and their respective profiles",
     *      @OA\Response(
     *          response=200,
     *          description="Pending Instructor profiles retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/InstructorProfile")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function pendingProfiles()
    {
        return $this->instructorProfile->pending();
    }

    /**
     * @OA\Delete(
     *     path="/instructors/{userId}/delete",
     *     operationId="deleteInstructorProfile",
     *     tags={"Instructors"},
     *     summary="Authority: Superadmin | Deletes an instructor profile",
     *     @OA\Parameter(
     *        name="userId",
     *        description="Instructor ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Instructor profile deleted",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Instructor profile not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function destroy(int $id)
    {
        return $this->instructorProfile->delete($id);
    }

    public function restore(int $id)
    {
        return $this->instructorProfile->restore($id);
    }
}
