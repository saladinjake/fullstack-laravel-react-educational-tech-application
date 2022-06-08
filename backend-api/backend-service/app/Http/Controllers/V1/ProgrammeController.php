<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Services\V1\ProgrammeService;
use App\Http\Requests\CreateProgrammeRequest;
use App\Http\Requests\UpdateProgrammeRequest;
use App\Http\Requests\CreateProgrammeCoursesRequest;

class ProgrammeController extends Controller
{
    public $programme;

    public function __construct(ProgrammeService $programmeService)
    {
        $this->programme = $programmeService;
    }

    /**
     * @OA\Get(
     *      path="/programmes",
     *      operationId="getProgrammes",
     *      tags={"Programmes"},
     *      summary="Authority: All | Gets all programmes",
     *      description="Retrieves all programmes and their levels",
     *      @OA\Response(
     *          response=200,
     *          description="Programmes retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Programme")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     *    )
     */
    public function index()
    {
        return $this->programme->fetchAll();
    }

    /**
     * @OA\Post(
     *       path="/programmes/create",
     *      operationId="createProgrammes",
     *      tags={"Programmes"},
     *      summary="Authority: Superadmin | Creates a Programme",
     *      description="Store a new Programme",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateProgrammeRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Programme created",
     *          @OA\JsonContent(ref="#/components/schemas/Programme")
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
     * @param  \Illuminate\Http\CreateProgrammeRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateProgrammeRequest $request)
    {
        return $this->programme->create($request->validated());
    }

    /**
     * @OA\Post(
     *       path="/programmes/create/courses",
     *      operationId="createProgrammeCourses",
     *      tags={"Programmes"},
     *      summary="Authority: Superadmin | Programme Courses",
     *      description="Store new courses for Programmes",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateProgrammeCoursesRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Programme courses created",
     *          @OA\JsonContent(ref="#/components/schemas/CreateProgrammeCoursesRequest")
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
     * @param  \Illuminate\Http\CreateProgrammeCoursesRequest $request
     * @return \Illuminate\Http\Response
     */
    public function createCourses(CreateProgrammeCoursesRequest $request) 
    {
        return $this->programme->createCourses($request->validated());
    }

    /**
     * @OA\Get(
     *     path="/programmes/{programmeId}",
     *     operationId="getProgramme",
     *     tags={"Programmes"},
     *     summary="Authority: Superadmin | Get list of courses belonging to a Programme",
     *     @OA\Parameter(
     *        name="programmeId",
     *        description="Programme ID",
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
    public function getProgramme(int $id)
    {
      return $this->programme->fetchOne($id);
    }

    /**
     * @OA\Put(
     *      path="/programmes/update/{programmeId}",
     *      operationId="updateProgramme",
     *      tags={"Programmes"},
     *      summary="Authority: Superadmin | Updates a Programme | Please use x-www-form-urlencoded for body",
     *      description="Update Programme",
     *      @OA\Parameter(
     *        name="programmeId",
     *        description="Programme ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/UpdateProgrammeRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Programme updated",
     *          @OA\JsonContent(ref="#/components/schemas/Programme")
     *      ),
     *      @OA\Response(
     *          response="403",
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Programme not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateProgrammeRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProgrammeRequest $request, int $id)
    {
        return $this->programme->update($request->validated(), $id);
    }

    /**
     * @OA\Delete(
     *     path="/programmes/{programmeId}/delete",
     *     operationId="deleteProgramme",
     *     tags={"Programmes"},
     *     summary="Authority: Superadmin | Delete a Programme",
     *     @OA\Parameter(
     *        name="userId",
     *        description="Programme ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Programme deleted",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Programme not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function destroy(int $id)
    {
        return $this->programme->delete($id);
    }
}
