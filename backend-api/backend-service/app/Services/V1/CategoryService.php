<?php

namespace App\Services\V1;

use App\Models\Category;
use App\Services\BaseService;
use Exception;
use DB;
use Auth;

class CategoryService extends BaseService
{
    public function fetchAll()
    {
        try {
            $categories = Category::whereNull('parent_id')->with('subcategories')->orderby('name', 'asc')->get();
            if (! $categories) {
                return formatResponse(200, 'No category record found', true);
            } else {
                return formatResponse(200, 'Categories retrieved successfully', true, $categories);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        try {
            $checker = Category::where(['id' => $id])->first();

            if (! $checker) {
                return formatResponse(404, 'Category doesn\'t exist!', false);
            } elseif (! is_null($checker->parent_id)) {
                return formatResponse(400, 'The provided ID is not a parent category', false);
            } else {

                $category = Category::where(['id' => $id])->whereNull('parent_id')->with('subcategories')->get();

                return formatResponse(200, 'Category retrieved successfully', true, $category);
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getParentCategories()
    {
        try {
            $categories = Category::whereNull('parent_id')->orderby('name', 'asc')->get();
            if (! $categories) {
                return formatResponse(200, 'No parent category record found', true);
            } else {
                return formatResponse(200, 'Parent categories retrieved successfully', true, $categories);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getSubCategories() {
      try {
          $categories = Category::whereNotNull('parent_id')->orderby('name', 'asc')->get();
          if (! $categories) {
              return formatResponse(200, 'No parent category record found', true);
          } else {
              return formatResponse(200, 'Parent categories retrieved successfully', true, $categories);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function create($data)
    {
        try {

            DB::transaction(function () use ($data, &$saveCategory) {
                $saveCategory = Category::create($data);
            });

            return formatResponse(201, 'Parent category defined successfully', true, $saveCategory);


        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function update($data, $id)
    {
        try {
            $category = $this->getCategory($id);
            if (! $category) {
                return formatResponse(404, 'Category not found', false);
            } elseif(! is_null($category->parent_id)) {
                return formatResponse(400, 'The provided ID is not a parent category', false);
            } else {
                DB::transaction(function () use ($data, $category) {
                    $updateCategory = $category->update(['name' => $data['name']]);
                });

                return formatResponse(200, 'Parent category updated successfully', true, $category);
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function createSubcategory($data)
    {
        try {

            DB::transaction(function () use ($data, &$saveCategory) {
                $saveCategory = Category::create($data);
            });

            return formatResponse(201, 'Subcategory defined successfully', true, $saveCategory);


        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function updateSubcategory($data, $id)
    {
        try {
            $category = $this->getCategory($id);
            if (! $category) {
                return formatResponse(404, 'Category not found', false);
            } elseif(is_null($category->parent_id)) {
                return formatResponse(400, 'The provided ID is not a subcategory', false);
            } else {
                DB::transaction(function () use ($data, $category) {
                    $updateCategory = $category->update(['name' => $data['name'], 'parent_id' => $data['parent_id']]);
                });

                return formatResponse(200, 'Subcategory updated successfully', true, $category);
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function delete($id, $data = null)
    {
        try {

            $category = Category::where(['id' => $id])->first();

            if (! $category) {
                return formatResponse(404, 'Category doesn\'t exist!', false);
            } elseif (! is_null($category->parent_id)) {
                return formatResponse(400, 'Oh Snap! The provided ID is not a parent category.', false);
            } else {
                $subcategories = Category::where(['parent_id' => $id])->get();
                DB::beginTransaction();
                    foreach($subcategories as $item){
                        $item->delete();
                    }
                    $category->delete();
                DB::commit();

                return formatResponse(200, 'Parent category deleted successfully', true);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function deleteSubcategory($id, $data = null)
    {
        try {

            $category = Category::where(['id' => $id])->first();

            if (! $category) {
                return formatResponse(404, 'Category doesn\'t exist!', false);
            } elseif (is_null($category->parent_id)) {
                return formatResponse(400, 'Oh Snap! The provided ID is not a subcategory.', false);
            } else {

                DB::beginTransaction();
                    $category->delete();
                DB::commit();

                return formatResponse(200, 'Subcategory deleted successfully', true);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function restore($id, $data = null)
    {
        try {
            $category = Category::onlyTrashed()->find($id);

            if (! $category) {
                return formatResponse(404, 'Category doesn\'t exist!', false);
            } elseif (! is_null($category->parent_id)) {
                return formatResponse(400, 'Oh Snap! The provided ID is not a parent category.', false);
            } else {

                DB::beginTransaction();
                    $category->restore();
                DB::commit();

                return formatResponse(200, 'Parent category restored successfully', true, $category);
            }
        } catch (Exception $e) {
            DB::rollback();
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function restoreSubcategory($id, $data = null)
    {
        try {
            $category = Category::onlyTrashed()->find($id);

            if (! $category) {
                return formatResponse(404, 'Category doesn\'t exist!', false);
            } elseif (is_null($category->parent_id)) {
                return formatResponse(400, 'Oh Snap! The provided ID is not a Subcategory.', false);
            } else {

                DB::beginTransaction();
                    $category->restore();
                DB::commit();

                return formatResponse(200, 'Subcategory restored successfully', true, $category);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function restoreAll($id, $data = null)
    {
        try {
            $category = Category::onlyTrashed()->find($id);

            if (! $category) {
                return formatResponse(404, 'Category doesn\'t exist!', false);
            } else {
                $subcategories = Category::where('parent_id', $id)->onlyTrashed()->get();
                DB::beginTransaction();
                    $category->restore();
                    foreach($subcategories as $cat){
                        $cat->restore();
                    }
                DB::commit();

                return formatResponse(200, 'Parent category and subcategories restored successfully', true, $category);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchMany($begin, $perPage, $sortBy, $sortDirection)
    {
        //..
    }

    public function getCategory($id)
    {
        $category = Category::where(['id' => $id])->first();

        return $category;
    }

}
