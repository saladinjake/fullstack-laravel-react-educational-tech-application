<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProgrammeRequest extends FormRequest
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
            'name' => 'required|max:255|string|unique:programmes,id,'.$this->id,
            'description' => 'required|string',
            'certificate_title' => 'nullable|max:255|string',
            'programme_levels' => 'required|array',
            'programme_levels.*.name' => 'required|string|max:255',
            'programme_levels.*.description' => 'required|string',
            'programme_courses' => 'nullable|array',
            'programme_courses.*.course_id' => 'required|integer|exists:courses,id',
        ];
    }

    public function messages()
    {
        return [   
            'programme_levels.required' => 'A programme should have levels',
            'programme_levels.*.name' => 'A programme level name cannot be empty',
            'programme_levels.*.description' => 'Please add a programme description',
            'programme_courses.*.course_id.exists' => 'This course does not exist',
        ];
    }
}
