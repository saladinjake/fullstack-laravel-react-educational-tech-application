<?php

namespace App\Services\V1;

use App\Models\Comment;
use App\Services\BaseService;
use Exception;
use DB;
use Auth;

class CommentService extends BaseService
{
    public function create($data)
    {
        try {

            DB::transaction(function () use ($data, &$saveComment) {
                $saveComment = Comment::create($data);
            });

            return formatResponse(201, 'Comment added', true, $saveComment);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function update($data, $id)
    {
        try {
            $comment = Comment::where(['id' => $id])->first();
            if (! $comment) {
                return formatResponse(404, 'Comment does not exist', false);
            } 

            DB::transaction(function () use ($data, $comment) {
                $comment->update(['comment' => $data['comment']]);
            });

            return formatResponse(200, 'Comment updated successfully', true, $comment);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }
}