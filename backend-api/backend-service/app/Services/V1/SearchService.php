<?php

namespace App\Services\V1;

use App\Models\Course;
use Illuminate\Http\Request;
use Exception;
use DB;
use Auth;

class SearchService
{

  public static function search(Request $filters)
  {
    $course = (new Course)->newQuery();
    if ($filters->has('course_name')) {
        $course->where('course_name', $filters->course_name);
    }
    if ($filters->has('course_code')) {
        $course->where('course_code', $filters->course_code);
    }
    if ($filters->has('learning_style')) {
        $course->where('learning_style', $filters->learning_style);
    }
    if ($filters->has('course_fee')) {
      if($filters->course_fee == 0) {
        $course->where('course_fee', 0);
      }
      elseif($filters->course_fee == 1) {
          $course->where('course_fee', '>', 0);
      }
      else {
        $course->where('course_fee', '!=', null);
      }
    }

    if ($filters->has('certified')) {
      if($filters->certified == 0) {
        $course->where('certificate_id', null);
      }
      elseif($filters->certified == 1) {
          $course->where('certificate_id', '!=', null);
      }
      else {
        $course->where('certificate_id', '!=', null);
      }
    }
    return response()->json([
       'success' => true,
       'message' => $course->count().' results found',
       'data' => $course->get(),
   ], 200);
  }
}
