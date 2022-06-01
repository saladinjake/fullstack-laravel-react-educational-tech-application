<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMultipleEnrollmentRequest extends FormRequest
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
            'course_id' => 'required|integer|exists:courses,id',
            'enrollments' => 'required|array',
            'enrollments.*.user_id' => 'required|integer|exists:users,id',
        ];
    }

    public function messages()
    {
        return [   
            'enrollments.required' => 'The enrollments array object is required.',         
            'enrollments.*.user_id.exists' => 'The provided user_id not found',
            'course_id.exists' => 'The provided course not found',
        ];
    }
}
