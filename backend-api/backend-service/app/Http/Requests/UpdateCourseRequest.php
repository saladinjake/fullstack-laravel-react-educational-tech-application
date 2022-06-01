<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
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
      'course_fee' => 'nullable|integer',
      'start_date' => 'nullable|date',
      'end_date' => 'nullable|date',
      'enrollment_start' => 'nullable|date',
      'enrollment_end' => 'nullable|date',
      'duration' => 'required|integer',
      'learning_style' => ['required', Rule::in($learning_style)],
      'certificate_id' => 'nullable|integer|exists:certificates,id',
      'category_id' => 'required|integer|exists:categories,id',
      'course_description' => 'required|max:255|string',
      'course_overview' => 'nullable|string',
      'course_thumbnail' => 'required|mimes:jpg,jpeg,png|max:300|dimensions:min_width=100,min_height=100,max_width=150,max_height=150',
      'introduction_video' => 'nullable|mimetypes:video/mp4,video/x-flv,application/x-mpegURL,video/MP2T,video/3gpp,video/quicktime,video/x-msvideo,video/x-ms-wmv|max:20000',
      'prerequisite_course' => 'nullable|max:255|string',
      'entrance_exam' => 'nullable|boolean',
      'license' => 'nullable|string',
      'overall_grade_range' => ['nullable', Rule::in($overall_grade_range)],
      'grace_period_on_deadline' => ['nullable', Rule::in($grace_period_on_deadline)],
      ];
    }

    public function messages()
    {
        return [
            'course_code.required' => 'A Course code is required.',
            'course_name.required' => 'The Course name field is required.',
            'course_code.unique' => 'A Course with this code already exists',
            'course_name.unique' => 'A Course with this name already exists',
            'learning_style.in' => 'Required Course Pace include Self Paced or Instructor Led.',
            'introduction_video.mimetypes' => 'Invalid Video format',
            'introduction_video.max'   => 'Videos should be less than 20megabytes',
            'certificate_id.exists' => 'The provided certificate not found',
            'category_id.exists' => 'The provided category not found',
            'course_description.required' => 'The Course description field is required.',
            'course_thumbnail.mimes' => 'Please insert image with jpeg/png formats only',
            'course_thumbnail.max'   => 'Image should be less than 300 KB',
            'course_thumbnail.dimensions' => 'Image Minimum Dimension is 150x150 and Max Dimension is 200x200',
            'course_cover_image.dimensions' => 'Image Minimum Dimension is 600x400 and Max Dimension is 800x600',
            'overall_grade_range.in' => 'Required Overall Grade Range not found',
            'grace_period_on_deadline.in' => 'Required Grace Period include 24hours or 2 days.',
        ];
    }
}
