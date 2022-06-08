<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Services\V1\ProgrammeLevelService;
use App\Http\Requests\UpdateProgrammeLevelRequest;
use Illuminate\Http\Request;

class ProgrammeLevelController extends Controller
{
    public $programmeLevel;

    public function __construct(ProgrammeLevelService $programmeLevelService)
    {
        $this->programmeLevel = $programmeLevelService;
    }

    /**
     * @OA\Get(
     *      path="/programmeLevel",
     *      operationId="getProgrammeLevel",
     *      tags={"ProgrammeLevel"},
     *      summary="Authority: All | Gets all programme levels",
     *      description="Retrieves all levels",
     *      @OA\Response(
     *          response=200,
     *          description="Programme Levels retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/ProgrammeLevel")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     *    )
     */
    public function index()
    {
        return $this->programmeLevel->fetchAll();
    }

    /**
     * @OA\Get(
     *     path="/programmeLevel/programmes/{levelName}",
     *     operationId="getProgrammes",
     *     tags={"ProgrammeLevel"},
     *     summary="Authority: Superadmin | Get list of programmes belonging to a Level",
     *     @OA\Parameter(
     *        name="levelName",
     *        description="Name of Level",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="string"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Programmes Retrieved",
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
    public function getProgrammes(string $levelName)
    {
      return $this->programmeLevel->getProgrammes($levelName);
    }

    /**
     * @OA\Put(
     *      path="/programmeLevel/update/{programmeId}",
     *      operationId="updateProgrammeLevel",
     *      tags={"ProgrammeLevel"},
     *      summary="Authority: Superadmin | Updates a ProgrammeLevel | Please use x-www-form-urlencoded for body",
     *      description="Update ProgrammeLevel",
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
     *          @OA\JsonContent(ref="#/components/schemas/UpdateProgrammeLevelRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Programme Level updated",
     *          @OA\JsonContent(ref="#/components/schemas/ProgrammeLevel")
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
     * @param  \Illuminate\Http\UpdateProgrammeLevelRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProgrammeLevelRequest $request, int $programmeId)
    {
        return $this->programmeLevel->update($request->validated(), $programmeId);
    }

    /**
     * @OA\Delete(
     *     path="/programmeLevel/{programmeId}/delete",
     *     operationId="deleteProgrammeLevel",
     *     tags={"ProgrammeLevel"},
     *     summary="Authority: Superadmin | Delete a Programme Level",
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
     *         description="Programme Level deleted",
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
    public function destroy(int $programmeId)
    {
        return $this->programmeLevel->delete($programmeId);
    }
}
