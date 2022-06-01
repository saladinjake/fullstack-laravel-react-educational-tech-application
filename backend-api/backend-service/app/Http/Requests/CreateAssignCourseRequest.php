<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAssignCourseRequest extends FormRequest
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
            'user_id' => 'required|integer|exists:users,id',
            'course_id' => 'required|integer|exists:courses,id',
        ];
    }

    public function messages()
    {
        return [            
            'user_id.exists' => 'The provided user not found',
            'course_id.exists' => 'The provided course not found',
        ];
    }
}
