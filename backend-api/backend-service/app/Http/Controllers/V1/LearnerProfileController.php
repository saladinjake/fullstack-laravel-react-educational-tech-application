<?php

namespace App\Http\Controllers\V1;

use App\Models\LearnerProfile;
use App\Services\V1\LearnerProfileService;
use Illuminate\Routing\Controller;
use App\Http\Requests\CreateLearnerProfileRequest;
use App\Http\Requests\UpdateLearnerProfileRequest;
use App\Http\Requests\CreateNewLearnerRequest;
use App\Http\Requests\CreateLearnerRequest;


class LearnerProfileController extends Controller
{
    public $learnerProfile;

    public function __construct(LearnerProfileService $learnerProfileService)
    {
        $this->learnerProfile = $learnerProfileService;
    }

    /**
     * @OA\Get(
     *       path="/learners",
     *      operationId="getLearners",
     *      tags={"Learners"},
     *      summary="Authority: Superadmin | Gets all learners",
     *      description="Retrieves all learner and their respective profiles",
     *      @OA\Response(
     *          response=200,
     *          description="Learner profiles retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/LearnerProfile")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     *    )
     */
    public function index()
    {
        return $this->learnerProfile->fetchAll();
    }

    /**
     * @OA\Post(
     *       path="/learners/profile",
     *      operationId="createLearnerProfile",
     *      tags={"Learners"},
     *      summary="Authority: Learner | Creates a learner profile",
     *      description="Stores a learner profile",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateLearnerProfileRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Learner profile created",
     *          @OA\JsonContent(ref="#/components/schemas/LearnerProfile")
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
     * @param  \Illuminate\Http\CreateLearnerProfileRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateLearnerProfileRequest $request)
    {
        return $this->learnerProfile->create($request->validated());
    }

    /**
     * @OA\Put(
     *      path="/learners/profile/{userId}",
     *      operationId="updateLearnerProfile",
     *      tags={"Learners"},
     *      summary="Authority: Learner | Updates a Learner Profile | Please use x-www-form-urlencoded for body",
     *      description="Update Learner Profile Information",
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
     *          @OA\JsonContent(ref="#/components/schemas/UpdateLearnerProfileRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Learner profile updated",
     *          @OA\JsonContent(ref="#/components/schemas/LearnerProfile")
     *      ),
     *      @OA\Response(
     *          response="403",
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Learner profile not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateLearnerProfileRequest  $request
     * @param  \App\Models\LearnerProfile  $learnerProfile
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLearnerProfileRequest $request, int $id)
    {
        return $this->learnerProfile->update($request->validated(), $id);
    }

    /**
     * @OA\Get(
     *     path="/learners/{userId}",
     *     operationId="getLearnerProfile",
     *     tags={"Learners"},
     *     summary="Authority: Superadmin | Get detailed profile of a learner",
     *     description="Detailed Profile of the specified learner",
     *     @OA\Response(
     *        response=200,
     *        description="Learner profile retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/LearnerProfile")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function show($id)
    {
        return $this->learnerProfile->fetchOne($id);
    }

    /**
     * @OA\Get(
     *     path="/learners/profile",
     *     operationId="showLearnerProfile",
     *     tags={"Learners"},
     *     summary="Authority: Learner | Get profile of the currently authenticated learner",
     *     description="Profile of the logged in learner",
     *     @OA\Response(
     *        response=200,
     *        description="Learner profile retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/LearnerProfile")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getLearnerProfile()
    {
        return $this->learnerProfile->getLearnerProfile();
    }

      /**
       * @OA\Patch(
       *     path="/learners/{userId}/upgrade",
       *     operationId="upgradeLearner",
       *     tags={"Learners"},
       *     summary="Authority: SuperAdmin | Update Learner with Instructor rights",
       *     @OA\Response(
       *         response=200,
       *         description="Learner upgraded successfully",
       *     ),
       *     @OA\Response(
       *         response="403",
       *         description="Unauthorized. User not with access role",
       *     ),
       *     @OA\Response(
       *         response=404,
       *         description="Learner profile not found",
       *     ),
       *     @OA\Response(
       *         response=422,
       *         description="The given data was invalid.",
       *     ),
       *  )
       */
    public function upgradeLearner($userId) {
      return $this->learnerProfile->upgradeLearner($userId);
    }

    /**
     * @OA\Post(
     *       path="/learners/create/profile",
     *      operationId="createLearner",
     *      tags={"Learners"},
     *      summary="Authority: Superadmin | Create a new learner",
     *      description="Creates a new learner account",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateLearnerRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Learner account created successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Learner")
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
     * @param  \Illuminate\Http\CreateLearnerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function createProfile(CreateLearnerRequest $request) {
      return $this->learnerProfile->createProfile($request->validated());
    }

    /**
     * @OA\Put(
     *      path="/learners/profile/{userId}/update",
     *      operationId="updateLearnerProfile",
     *      tags={"Learners"},
     *      summary="Authority: Superadmin | Updates a Learner Profile | Please use x-www-form-urlencoded for body",
     *      description="Update Learner Profile Information",
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
     *          @OA\JsonContent(ref="#/components/schemas/UpdateLearnerProfileRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Learner profile updated",
     *          @OA\JsonContent(ref="#/components/schemas/LearnerProfile")
     *      ),
     *      @OA\Response(
     *          response="403",
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Learner profile not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateLearnerProfileRequest  $request
     * @param  \App\Models\LearnerProfile  $learnerProfile
     * @return \Illuminate\Http\Response
     */
    public function updateLearner(UpdateLearnerProfileRequest $request, int $id) {
      return $this->learnerProfile->updateProfile($request->validated(), $id);
    }

    /**
     * @OA\Get(
     *     path="/learners/my/payments",
     *     operationId="showLearnerPayments",
     *     tags={"Learners"},
     *     summary="Authority: Learner | Get payments of the currently authenticated learner",
     *     description="Payments of the logged in learner",
     *     @OA\Response(
     *        response=200,
     *        description="Learner payments retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/CoursePayment")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function payments()
    {
        return $this->learnerProfile->getMyPayments();
    }

    /**
     * @OA\Put(
     *     path="/learners/{userId}/deactivate",
     *     operationId="deactivateLearner",
     *     tags={"Learners"},
     *     summary="Authority: Superadmin | Deactivates a learner",
     *     @OA\Parameter(
     *        name="userId",
     *        description="Learner ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Learner profile deactivated",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Learner profile not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function deactivate(int $id)
    {
        return $this->learnerProfile->deactivate($id);
    }

    /**
     * @OA\Patch(
     *     path="/learners/deactivate/profile",
     *     operationId="deactivateProfile",
     *     tags={"Learners"},
     *     summary="Authority: user | Deactivates authenticated learner",
     *     @OA\Response(
     *         response=200,
     *         description="Learner profile deactivated",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Learner profile not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function deactivateProfile()
    {
        return $this->learnerProfile->deactivateProfile();
    }

    /**
     * @OA\Put(
     *     path="/learners/{userId}/activate",
     *     operationId="activateLearner",
     *     tags={"Learners"},
     *     summary="Authority: Superadmin | Activates a learner",
     *     @OA\Parameter(
     *        name="userId",
     *        description="Learner ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Learner profile activated",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Learner profile not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function activate(int $id)
    {
        return $this->learnerProfile->activate($id);
    }

    /**
     * @OA\Get(
     *       path="/learners/activeProfiles",
     *      operationId="activeLearnerProfile",
     *      tags={"Learners"},
     *      summary="Authority: Superadmin | Gets all active learners",
     *      description="Retrieves all active learners and their respective profiles",
     *      @OA\Response(
     *          response=200,
     *          description="Active Learner profiles retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/LearnerProfile")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function activeProfiles()
    {
        return $this->learnerProfile->active();
    }

    /**
     * @OA\Get(
     *       path="/learners/deactivatedProfiles",
     *      operationId="deactivedLearnerProfile",
     *      tags={"Learners"},
     *      summary="Authority: Superadmin | Gets all deactivated learners",
     *      description="Retrieves all deactivated learners and their respective profiles",
     *      @OA\Response(
     *          response=200,
     *          description="Deactivated Learner profiles retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/LearnerProfile")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function deactivatedProfiles()
    {
        return $this->learnerProfile->deactivated();
    }

    /**
     * @OA\Delete(
     *     path="/learners/{userId}/delete",
     *     operationId="deleteLearnerProfile",
     *     tags={"Learners"},
     *     summary="Authority: Superadmin | Deletes a learner profile",
     *     @OA\Parameter(
     *        name="userId",
     *        description="Learner ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Learner profile deleted",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Learner profile not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function destroy(int $id)
    {
        return $this->learnerProfile->delete($id);
    }

    public function restore(int $id)
    {
        return $this->learnerProfile->restore($id);
    }
}
