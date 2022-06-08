<?php

namespace App\Http\Controllers\V1;

use App\Models\Category;
use App\Services\V1\CategoryService;
use Illuminate\Routing\Controller;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Requests\CreateSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;

class CategoryController extends Controller
{
    public $category;

    public function __construct(CategoryService $categoryService)
    {
        $this->category = $categoryService;
    }

    /**
     * @OA\Get(
     *       path="/categories",
     *      operationId="getCategories",
     *      tags={"Categories"},
     *      summary="Authority: None | Gets all categories",
     *      description="Retrieves all categories and corresponding subcategories.",
     *      @OA\Response(
     *          response=200,
     *          description="Categories retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Category")
     *      ),
     *    )
     */
    public function index()
    {
        return $this->category->fetchAll();
    }

    /**
     * @OA\Get(
     *       path="/categories/parent",
     *      operationId="getParentCategories",
     *      tags={"Categories"},
     *      summary="Authority: None | Gets all parent categories",
     *      description="Retrieves all parent categories",
     *      @OA\Response(
     *          response=200,
     *          description="Parent categories retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Category")
     *      ),
     *    )
     */
    public function getParentCategories()
    {
        return $this->category->getParentCategories();
    }

    /**
     * @OA\Get(
     *       path="/categories/subCategories",
     *      operationId="getSubCategories",
     *      tags={"Categories"},
     *      summary="Authority: None | Gets all sub-categories",
     *      description="Retrieves all sub-categories",
     *      @OA\Response(
     *          response=200,
     *          description="Sub categories retrieved successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Category")
     *      ),
     *    )
     */
    public function getSubCategories() {
      return $this->category->getSubCategories();
    }

    /**
     * @OA\Post(
     *       path="/categories/parent",
     *      operationId="createParentCategory",
     *      tags={"Categories"},
     *      summary="Authority: Superadmin | Define a new parent category",
     *      description="Creates a parent category",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateCategoryRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Parent category defined successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Category")
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
     * @param  \Illuminate\Http\CreateCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCategoryRequest $request)
    {
        return $this->category->create($request->validated());
    }

    /**
     * @OA\Put(
     *      path="/categories/parent/{categoryId}",
     *      operationId="updateParentCategory",
     *      tags={"Categories"},
     *      summary="Authority: Superadmin | Updates a parent category | Please use x-www-form-urlencoded for body",
     *      description="Update Parent Category",
     *      @OA\Parameter(
     *        name="categoryId",
     *        description="Category ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/UpdateCategoryRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Category updated",
     *          @OA\JsonContent(ref="#/components/schemas/Category")
     *      ),
     *      @OA\Response(
     *          response="403",
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Parent category not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateCategoryRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategoryRequest $request, int $id)
    {
        return $this->category->update($request->validated(), $id);
    }

    /**
     * @OA\Post(
     *       path="/categories/subcategory",
     *      operationId="createSubCategory",
     *      tags={"Categories"},
     *      summary="Authority: Superadmin | Define a new subcategory",
     *      description="Creates a subcategory",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateSubCategoryRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Subcategory defined successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Category")
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
     * @param  \Illuminate\Http\CreateSubCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function createSubcategory(CreateSubCategoryRequest $request)
    {
        return $this->category->createSubcategory($request->validated());
    }

    /**
     * @OA\Put(
     *      path="/categories/subcategory/{categoryId}",
     *      operationId="updateSubcategory",
     *      tags={"Categories"},
     *      summary="Authority: Superadmin | Updates a subcategory | Please use x-www-form-urlencoded for body",
     *      description="Update Subcategory",
     *      @OA\Parameter(
     *        name="categoryId",
     *        description="Category ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/UpdateSubCategoryRequest")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Subcategory updated successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Category")
     *      ),
     *      @OA\Response(
     *          response="403",
     *          description="Unauthorized. User not with access role",
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Subcategory not found",
     *       ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateSubCategoryRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function updateSubcategory(UpdateSubCategoryRequest $request, int $id)
    {
        return $this->category->updateSubcategory($request->validated(), $id);
    }

    /**
     * @OA\Get(
     *     path="/categories/{categoryId}",
     *     operationId="getCategoryById",
     *     tags={"Categories"},
     *     summary="Authority: None | Get details of a category",
     *     description="Retrieves a category and corresponding subcategories",
     *     @OA\Parameter(
     *        name="categoryId",
     *        description="Category ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *        response=200,
     *        description="Category retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/Category")
     *     ),
     * )
     */
    public function show($id)
    {
        return $this->category->fetchOne($id);
    }

    /**
     * @OA\Delete(
     *     path="/categories/{categoryId}/delete",
     *     operationId="deleteCategory",
     *     tags={"Categories"},
     *     summary="Authority: Superadmin | Deletes a parent category",
     *     description="Removes a parent category and corresponding subcategories",
     *     @OA\Parameter(
     *        name="categoryId",
     *        description="Category ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Parent category deleted successfully",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Parent category not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function destroy(int $id)
    {
        return $this->category->delete($id);
    }

    /**
     * @OA\Delete(
     *     path="/categories/{subCategoryId}/removeSubcategory",
     *     operationId="deleteSubCategory",
     *     tags={"Categories"},
     *     summary="Authority: Superadmin | Deletes a subcategory",
     *     description="Removes a subcategory",
     *     @OA\Parameter(
     *        name="subCategoryId",
     *        description="Subcategory ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Subcategory deleted successfully",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Subcategory not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function deleteSubcategory(int $id)
    {
        return $this->category->deleteSubcategory($id);
    }

    /**
     * @OA\Post(
     *     path="/categories/{categoryId}/restore",
     *     operationId="restoreCategory",
     *     tags={"Categories"},
     *     summary="Authority: Superadmin | Restores a parent category",
     *     description="Restores a parent category",
     *     @OA\Parameter(
     *        name="categoryId",
     *        description="category ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Parent category restored successfully",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Category not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */

    public function restore(int $id)
    {
        return $this->category->restore($id);
    }

    /**
     * @OA\Post(
     *     path="/categories/{categoryId}/restoreSubcategory",
     *     operationId="restoreSubcategory",
     *     tags={"Categories"},
     *     summary="Authority: Superadmin | Restores a Subcategory",
     *     description="Restores a Subcategory",
     *     @OA\Parameter(
     *        name="categoryId",
     *        description="category ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Subcategory restored successfully",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Subcategory not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */

    public function restoreSubcategory(int $id)
    {
        return $this->category->restoreSubcategory($id);
    }

    /**
     * @OA\Post(
     *     path="/categories/{categoryId}/restoreAll",
     *     operationId="restoreCategoryAndSubcategory",
     *     tags={"Categories"},
     *     summary="Authority: Superadmin | Restores a category and subcategories",
     *     description="Restores a parent category and corresponding subcategories",
     *     @OA\Parameter(
     *        name="categoryId",
     *        description="category ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Parent category and subcategories restored successfully",
     *     ),
     *     @OA\Response(
     *         response="403",
     *         description="Unauthorized. User not with access role",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Category not found",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="The given data was invalid.",
     *     ),
     *  )
     */
    public function restoreAll(int $id)
    {
        return $this->category->restoreAll($id);
    }
}
