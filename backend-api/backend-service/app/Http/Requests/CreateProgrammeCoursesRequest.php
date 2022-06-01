<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProgrammeCoursesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'programme_courses' => 'required|array',
            'programme_courses.*.course_id' => 'required|integer|exists:courses,id',
            'programme_courses.*.programme_id' => 'required|integer|exists:programmes,id',
            'programme_courses.*.programme_level_id' => 'required|integer|exists:programme_levels,id'
        ];
    }

    public function messages()
    {
        return [   
            'programme_courses.*.course_id.exists' => 'This course does not exist',
            'programme_courses.*.programme_id.exists' => 'This programme does not exist',
        ];
    }
}
