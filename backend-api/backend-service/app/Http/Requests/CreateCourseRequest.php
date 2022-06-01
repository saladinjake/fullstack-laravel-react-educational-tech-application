<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateCourseRequest extends FormRequest
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
      $learning_style = [
          'Self Paced', 'Instructor Led',
      ];
      $overall_grade_range = [
          '20', '30', '50', '70', '100'
      ];
      $grace_period_on_deadline = [
          '24hours', '2 days'
      ];

      return [
      'course_code' => 'nullable|alpha_dash|unique:courses,business_id,'.$this->business_id,
      'course_name' => 'required|max:255|string|unique:courses,business_id,'.$this->business_id,
      'lms_course_id' => 'nullable|string|unique:courses,id,'.$this->id,
      'price' => 'nullable|integer',
      'start_date' => 'nullable|date',
      'end_date'   => 'nullable|date',
      'enrollment_start' => 'nullable|date',
      'enrollment_end' => 'nullable|date',
      'duration' => 'required|string',
      'learning_style' => ['required', Rule::in($learning_style)],
      'business_id' => 'nullable|integer|exists:business_profiles,id',
      'language_id' => 'required|integer|exists:languages,id',
      'certificate_id' => 'nullable|integer|exists:certificates,id',
      'category_id' => 'required|integer|exists:categories,id',
      'course_description' => 'required|string',
      'course_overview' => 'nullable|string',
      'course_thumbnail' => 'nullable|string',
      'introduction_video' => 'nullable|url',
      'prerequisite_course' => 'nullable|string',
      'entrance_exam' => 'nullable|boolean',
      'license' => 'nullable|string',
      'overall_grade_range' => ['nullable', Rule::in($overall_grade_range)],
      'grace_period_on_deadline' => ['nullable', Rule::in($grace_period_on_deadline)],
      'course_cover_image' => 'nullable|string',
      'topics' => 'required|string',
      'instructors' => 'nullable|string',
      'outcomes' => 'required|string',
      ];
    }

    public function messages()
    {
        return [
            'course_name.required' => 'The Course name field is required.',
            'course_code.unique' => 'A Course with this code already exists',
            'course_name.unique' => 'A Course with this name already exists',
            'learning_style.in' => 'Required Course Pace include Self Paced or Instructor Led.',
            'introduction_video.url' => 'The video url must be a valid URL',
            'business_id.exists' => 'The provided business not found',
            'language_id.exists' => 'The provided language not found',
            'language_id.required' => 'Please select a Language',
            'certificate_id.exists' => 'The provided certificate not found',
            'category_id.exists' => 'The provided category not found',
            'course_description.required' => 'The Course description field is required.',
            'overall_grade_range.in' => 'Required Overall Grade Range not found',
            'grace_period_on_deadline.in' => 'Required Grace Period include 24hours or 2 days.',
            'instructors.required' => 'The instructors array object is required.'
        ];
    }
}
