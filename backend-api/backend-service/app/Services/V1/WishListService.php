<?php

namespace App\Services\V1;

use App\Models\WishList;
use App\Services\BaseService;
use Exception;
use DB;
use Auth;

class WishListService extends BaseService
{
    public function fetchAll()
    {
        try {
            $wish = WishList::where(['user_id' => Auth::id()])->first();
            if (! $wish) {
                return formatResponse(200, 'No wishlist found', true);
            } else {
                $wishes = WishList::with('course')->where(['user_id' => Auth::id()])->paginate(15);
                return formatResponse(200, 'Course wishlist(s) retrieved successfully', true, $wishes);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function create($data)
    {
        try {
            $data['user_id'] = Auth::id();

            $wish = WishList::where(['course_id' => $data['course_id'], 'user_id' => Auth::id()])->first();

            if (! $wish) {

                DB::transaction(function () use ($data) {
                    WishList::create($data);
                });

                return formatResponse(201, 'Course added to wishlist successfully', true);

            } else {
                return formatResponse(422, 'Oh Snap! You\'ve previously added this course to your wishlist.', false);
            }           
            
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function delete($id, $data = null)
    {
        try {

            $wish = WishList::where(['id' => $id])->first();

            $userWish = WishList::where(['id' => $id, 'user_id' => Auth::id()])->first();

            if (! $wish) {
                return formatResponse(404, 'Wishlist doesn\'t exist!', false);
            } elseif (! $userWish) {
                return formatResponse(404, 'Provided wishlist not found for this user.', false);
            } else {

                DB::beginTransaction();
                    $userWish->delete();
                DB::commit();

                return formatResponse(200, 'Course removed from wishlist successfully', true);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        //
    }

    public function update($data, $id)
    {
        //..
    }

    public function fetchMany($begin, $perPage, $sortBy, $sortDirection)
    {
        //..
    }

}