<?php

namespace App\Http\Controllers\V1;

use App\Models\WishList;
use App\Services\V1\WishListService;
use Illuminate\Routing\Controller;
use App\Http\Requests\CreateWishListRequest;

class WishListController extends Controller
{
    public $wishList;

    public function __construct(WishListService $wishListService)
    {
        $this->wishList = $wishListService;
    }

    /**
     * @OA\Get(
     *     path="/wishlists/me",
     *     operationId="showUserWishLists",
     *     tags={"WishLists"},
     *     summary="Authority: Superadmin, Admin, Learner, Instructor, Business | Get wishes of the currently authenticated user",
     *     description="Retrieve all interested course of the logged in user.",
     *     @OA\Response(
     *        response=200,
     *        description="Course wishlist(s) retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/WishList")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getUserWishLists()
    {
        return $this->wishList->fetchAll();
    }

    /**
     * @OA\Post(
     *       path="/wishlists/add",
     *      operationId="createWishList",
     *      tags={"WishLists"},
     *      summary="Authority: Superadmin, Admin, Learner, Instructor, Business | Add course to wish list",
     *      description="Bookmarks a course by adding the course to the user's wish list",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateWishListRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Course added to wishlist successfully",
     *          @OA\JsonContent(ref="#/components/schemas/WishList")
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
     * @param  \Illuminate\Http\CreateWishListRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateWishListRequest $request)
    {
        return $this->wishList->create($request->validated());
    }

    /**
     * @OA\Delete(
     *     path="/wishlists/{wishlistId}/delete",
     *     operationId="deleteWishList",
     *     tags={"WishLists"},
     *     summary="Authority: Superadmin, Admin, Learner, Instructor, Business | Deletes a wishlist",
     *     description="Removes a course from user's wishlist",
     *     @OA\Parameter(
     *        name="wishlistId",
     *        description="WishList ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Course removed from wishlist successfully",
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
    public function destroy(int $id)
    {
        return $this->wishList->delete($id);
    }

}
