<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignCourseMultiple extends FormRequest
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
            'users' => 'required|array',
            'users.*.user_id' => 'required|integer|exists:users,id',
            'users.*.course_id' => 'required|integer|exists:courses,id',
        ];
    }

    public function messages()
    {
        return [            
            'users.*.user_id.exists' => 'The provided user_id not found',
            'users.*.course_id.exists' => 'The provided course_id not found',
        ];
    }
}
