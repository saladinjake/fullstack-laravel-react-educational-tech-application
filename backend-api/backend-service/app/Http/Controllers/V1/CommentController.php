<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Services\V1\CommentService;
use App\Http\Requests\CreateCommentRequest;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  public $comment;

  public function __construct(CommentService $blog)
  {
    $this->comment = $comment;
  }

  /**
   * @OA\Post(
   *      path="/comments/create",
   *      operationId="createBlogComment",
   *      tags={"Comments"},
   *      summary="Authority: All | Creates a blog comment",
   *      description="Stores a new Blog Comment",
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/CreateCommentRequest")
   *      ),
   *      @OA\Response(
   *          response=201,
   *          description="Comment added",
   *          @OA\JsonContent(ref="#/components/schemas/Comment")
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
   * @param  \Illuminate\Http\CreateCommentRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(CreateCommentRequest $request)
  {
      return $this->comment->create($request->validated());
  }

  /**
   * @OA\Put(
   *      path="/comments/update/{commentId}",
   *      operationId="updateComment",
   *      tags={"Comments"},
   *      summary="Authority: All | Updates a comment | Please use x-www-form-urlencoded for body",
   *      description="Update Blog comment",
   *      @OA\Parameter(
   *        name="commentId",
   *        description="Comment ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *      ),
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/CreateCommentRequest")
   *      ),
   *      @OA\Response(
   *          response=200,
   *          description="Comment updated",
   *          @OA\JsonContent(ref="#/components/schemas/Comment")
   *      ),
   *      @OA\Response(
   *          response="403",
   *          description="Unauthorized. User not with access role",
   *      ),
   *      @OA\Response(
   *          response=404,
   *          description="Comment not found",
   *       ),
   *      @OA\Response(
   *          response=422,
   *          description="The given data was invalid.",
   *      ),
   *    )
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\UpdateCommentRequest $request
   * @param  \App\Models\Comment $comment
   * @return \Illuminate\Http\Response
   */
  public function update(UpdateCommentRequest $request, int $id)
  {
      return $this->comment->update($request->validated(), $id);
  }

  /**
   * @OA\Delete(
   *     path="/comments/{commentId}/delete",
   *     operationId="deleteComment",
   *     tags={"Comments"},
   *     summary="Authority: Superadmin | Deletes a Comment",
   *     description="Deletes a Blog comment",
   *     @OA\Parameter(
   *        name="commentId",
   *        description="Comment ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="Comment deleted successfully",
   *     ),
   *     @OA\Response(
   *         response="403",
   *         description="Unauthorized. User not with access role",
   *     ),
   *     @OA\Response(
   *         response=404,
   *         description="Comment not found",
   *     ),
   *     @OA\Response(
   *         response=422,
   *         description="The given data was invalid.",
   *     ),
   *  )
   */
  public function destroy(int $id)
  {
      return $this->comment->delete($id);
  }
}
