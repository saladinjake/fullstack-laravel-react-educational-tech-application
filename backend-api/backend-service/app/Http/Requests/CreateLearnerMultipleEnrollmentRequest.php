<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateLearnerMultipleEnrollmentRequest extends FormRequest
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
            // 'user_id' => 'required|integer|exists:users,id',
            'enrollments' => 'required|array',
            'enrollments.*.course_id' => 'required|integer|exists:courses,id',
        ];
    }

    public function messages()
    {
        return [   
            'enrollments.required' => 'The enrollments array object is required.',         
            'enrollments.*.course_id.exists' => 'The provided course_id not found',
            // 'user_id.exists' => 'The provided user not found',
        ];
    }
}
