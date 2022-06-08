<?php

namespace App\Http\Controllers\V1;

use App\Models\BusinessMember;
use App\Services\V1\BusinessMemberService;
use Illuminate\Routing\Controller;
use App\Http\Requests\CreateBusinessMemberRequest;
// use App\Http\Requests\UpdateBusinessMemberRequest;

class BusinessMemberController extends Controller
{
    public $businessMember;

    public function __construct(BusinessMemberService $businessMemberService)
    {
        $this->businessMember = $businessMemberService;
    }

    /**
     * @OA\Get(
     *       path="/business/members",
     *      operationId="getBusinessMembers",
     *      tags={"Business"},
     *      summary="Authority: Superadmin | Gets all business member(s)",
     *      description="Retrieves all member(s) of a business.",
     *      @OA\Response(
     *          response=200,
     *          description="Members retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/BusinessMember")
     *      ),
     *    )
     */
    public function index()
    {
        return $this->businessMember->fetchAll();
    }

    /**
     * @OA\Get(
     *     path="/business/members/me",
     *     operationId="showBusinessMembers",
     *     tags={"Business"},
     *     summary="Authority: Business | Get all member(s) of the business",
     *     description="Retrieves all member(s) of the logged in business.",
     *     @OA\Response(
     *        response=200,
     *        description="Members retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/BusinessMember")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getBusinessMembers()
    {
        return $this->businessMember->getBusinessMembers();
    }

    /**
     * @OA\Post(
     *       path="/business/members/create",
     *      operationId="createBusinessMember",
     *      tags={"Business"},
     *      summary="Authority: Business | Add a new business member",
     *      description="Creates a member attached to the business",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateBusinessMemberRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Member added successfully",
     *          @OA\JsonContent(ref="#/components/schemas/BusinessMember")
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
     * @param  \Illuminate\Http\CreateBusinessMemberRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateBusinessMemberRequest $request)
    {
        return $this->businessMember->create($request->validated());
    }

    /**
     * @OA\Post(
     *       path="/business/members/multiple",
     *      operationId="createMultipleBusinessMember",
     *      tags={"Business"},
     *      summary="Authority: Business | Add multiple business members",
     *      description="Creates multiple members attached to the business",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateBusinessMemberRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Member added successfully",
     *          @OA\JsonContent(ref="#/components/schemas/BusinessMember")
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
     * @param  \Illuminate\Http\CreateMultipleBusinessMemberRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function createMultiple(CreateMultipleBusinessMemberRequest $request)
    {
        return $this->businessMember->createMultiple($request->validated());
    }

    
    /**
     * @OA\Delete(
     *     path="/business/members/{userId}/delete",
     *     operationId="deleteBusinessMember",
     *     tags={"Business"},
     *     summary="Authority: Business | Deletes a staff",
     *     description="Removes a staff from business member list",
     *     @OA\Parameter(
     *        name="userId",
     *        description="User ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Member deleted successfully",
     *     ),
     *     @OA\Response(
     *         response="403", 
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Member not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function destroy(int $id)
    {
        return $this->businessMember->delete($id);
    }

}
