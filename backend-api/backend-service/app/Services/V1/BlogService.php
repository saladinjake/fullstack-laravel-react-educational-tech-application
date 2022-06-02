<?php

namespace App\Services\V1;

use App\Models\Blog;
use App\Services\BaseService;
use Exception;
use DB;
use Illuminate\Support\Str;
use Auth;

class BlogService extends BaseService
{
    public function fetchAll()
    {
        try {
            $blog = Blog::latest()->get();
            if (! $blog) {
                return formatResponse(200, 'No Blog post found', true);
            } else {
                return formatResponse(200, 'Blogposts retrieved successfully', true, $blog);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($slug)
    {
        try {
            $blog = Blog::where('slug', $slug)->first();
            if(! $blog) {
                return formatResponse(404, 'Post not found', false);
            }
            return formatResponse(200, 'Post retrieved successfully', true, $blog);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function create($data)
    {
      try {

        if (! empty($data['banner'])) {
            $upload = $data['banner']->storeOnCloudinary('Questence-Articles');
            $data['banner'] = $upload->getSecurePath();
        }

        $data['slug'] = Str::slug($data['title'], '-');

        DB::transaction(function () use ($data, &$savePost) {
            $savePost = Blog::create($data);
        });

        return formatResponse(201, 'Post created successfully', true, $savePost);
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function update($data, $id)
    {
      try {
        $blog = Blog::where(['id' => $id])->first();

        if (! $blog) {
            return formatResponse(404, 'Post not found', false);
        }

        /*if (! empty($data['banner'])) {
            $upload = $data['banner']->storeOnCloudinary('Questence-Articles');
            $data['banner'] = $upload->getSecurePath();
        }*/
         
        $data['slug'] = Str::slug($data['title'], '-');
        DB::transaction(function () use ($data, &$blog) {
            $blog->update($data);
        });

        return formatResponse(201, 'Post created successfully', true, $blog);
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function delete($id, $data = null)
    {
        try {

            $blog = Blog::where(['id' => $id])->first();

            if (! $blog) {
                return formatResponse(404, 'Post doesn\'t exist!', false);
            }  
            
            DB::beginTransaction();
            $blog->delete();
            DB::commit();
            
            return formatResponse(200, 'Post deleted successfully', true);
        } catch (Exception $e) {
            DB::rollback();
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchMany($begin, $perPage, $sortBy, $sortDirection)
    {
        //..
    }
}