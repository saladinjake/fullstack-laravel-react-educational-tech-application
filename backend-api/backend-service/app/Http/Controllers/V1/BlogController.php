<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Services\V1\BlogService;
use App\Http\Requests\CreateBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Illuminate\Http\Request;

class BlogController extends Controller
{
  public $blog;

  public function __construct(BlogService $blog)
  {
    $this->blog = $blog;
  }

  /**
   * @OA\Get(
   *      path="/blog",
   *      operationId="blogIndex",
   *      tags={"Blog"},
   *      summary="Authority: All | Gets all blog posts",
   *      description="Retrieves all blog posts",
   *      @OA\Response(
   *          response=200,
   *          description="Post posts retrieved",
   *          @OA\JsonContent(ref="#/components/schemas/Blog")
   *       )
   *    )
   */
  public function index()
  {
      return $this->blog->fetchAll();
  }

  /**
   * @OA\Post(
   *      path="/blog/create",
   *      operationId="createBlogPost",
   *      tags={"Blog"},
   *      summary="Authority: Superadmin | Creates a blog post",
   *      description="Stores a new Blog Post",
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/CreateBlogRequest")
   *      ),
   *      @OA\Response(
   *          response=201,
   *          description="Blog post created",
   *          @OA\JsonContent(ref="#/components/schemas/Blog")
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
   * @param  \Illuminate\Http\CreateBlogRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(CreateBlogRequest $request)
  {
      return $this->blog->create($request->validated());
  }

  /**
   * @OA\Get(
   *     path="/blog/{slug}",
   *     tags={"Blog"},
   *     summary="Authority: All | Get content of a Blog post",
   *     description="Blog slug is compulsory",
   *     @OA\Parameter(
   *        name="slug",
   *        description="Blog slug",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="string"
   *        )
   *     ),
   *     @OA\Response(
   *        response=200,
   *        description="Post post retrieved",
   *        @OA\JsonContent(ref="#/components/schemas/Blog")
   *     ),
   *     @OA\Response(response="404", description="Resource not found"),
   *     @OA\Response(response="422", description="The given data was invalid.")
   * )
   */
  public function show($slug)
  {
      return $this->blog->fetchOne($slug);
  }

  /**
   * @OA\Put(
   *      path="/blog/update/{blogId}",
   *      operationId="updateBlog",
   *      tags={"Blog"},
   *      summary="Authority: Superadmin | Updates a blog | Please use x-www-form-urlencoded for body",
   *      description="Update Blog post",
   *      @OA\Parameter(
   *        name="blogId",
   *        description="Blog ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *      ),
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/UpdateBlogRequest")
   *      ),
   *      @OA\Response(
   *          response=200,
   *          description="Post updated",
   *          @OA\JsonContent(ref="#/components/schemas/Blog")
   *      ),
   *      @OA\Response(
   *          response="403",
   *          description="Unauthorized. User not with access role",
   *      ),
   *      @OA\Response(
   *          response=404,
   *          description="Post not found",
   *       ),
   *      @OA\Response(
   *          response=422,
   *          description="The given data was invalid.",
   *      ),
   *    )
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\UpdateBlogRequest $request
   * @param  \App\Models\Blog $blog
   * @return \Illuminate\Http\Response
   */
  public function update(UpdateBlogRequest $request, int $id)
  {
      return $this->blog->update($request->validated(), $id);
  }

  /**
   * @OA\Delete(
   *     path="/blog/{blogId}/delete",
   *     operationId="deleteBlog",
   *     tags={"Blog"},
   *     summary="Authority: Superadmin | Deletes a Blog",
   *     description="Deletes a Blog post",
   *     @OA\Parameter(
   *        name="blogId",
   *        description="Blog ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="Post deleted successfully",
   *     ),
   *     @OA\Response(
   *         response="403",
   *         description="Unauthorized. User not with access role",
   *     ),
   *     @OA\Response(
   *         response=404,
   *         description="Post not found",
   *     ),
   *     @OA\Response(
   *         response=422,
   *         description="The given data was invalid.",
   *     ),
   *  )
   */
  public function destroy(int $id)
  {
      return $this->blog->delete($id);
  }
}
