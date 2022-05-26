<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateInstructorRequest extends FormRequest
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
        $gender = [
            'Male', 'Female', 'Prefer Not To Say',
        ];

        $employment_status = [
            'Employed', 'Not Employed'
        ];

        $education_level = [
            'Primary', 'Secondary', 'Tertiary', 'Postgraduate', 'Diploma', 'High School', 'College', 'A-Level'
        ];

        $marital_status = [
            'Single', 'Married', 'Widowed', 'Divorced', 'Seperated'
        ];

        return [
            'first_name' => 'required|max:150|string',
            'last_name' => 'required|max:150|string',
            'email' => ['required', 'email', 'max:191', 'string', 'regex:/^\w+[-\.\w]*@(?!(?:outlook|gmail|hotmail|yahoo)\.com$)\w+[-\.\w]*?\.\w{2,4}$/', 'unique:users'],
            // 'password' => 'required|min:8|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
            'phone_number' => 'required|max:20|unique:users',
            //'gender' => ['required', Rule::in($gender)],
            'country_id' => 'required|integer|exists:countries,id',
            'category_id' => 'required|integer|exists:categories,id',
            //'industry_id' => 'required|integer|exists:industries,id',
            //'biography' => 'nullable|max:2000|string',
            //'date_of_birth' => 'required|date_format:Y-m-d',
            //'employment_status' => ['required', Rule::in($employment_status)],
            //'marital_status' => ['required', Rule::in($marital_status)],
            'experience_level' => 'required|max:20|integer',
            //'education_level' => ['required', Rule::in($education_level)],
            //'degree_obtained' => 'required|max:191|string',
            //'language' => 'required|string|exists:languages,english',
            //'facebook_url' => 'nullable|max:191|url',
            //'linkedin_url' => 'nullable|max:191|url',
            //'twitter_url' => 'nullable|max:191|url',
            //'image' => 'nullable|mimes:jpg,jpeg,png|max:300|dimensions:min_width=100,min_height=100,max_width=150,max_height=150',
            //'current_employer_name' => 'nullable|max:191|string',
            //'current_employer_designation' => 'nullable|max:191|string',
            //'previous_employer_name' => 'nullable|max:191|string',
            //'previous_employer_designation' => 'nullable|max:191|string',
            'previous_institutions' => 'nullable|string',
            'niche_courses' => 'nullable|string',
            'other_info' => 'nullable|max:255|string'
          ];
    }

    public function messages()
    {
        return [
            // 'password.regex' => 'Password should have a minimum of eight characters and at least one letter and one number',
            //'gender.in' => 'Required gender include Male, Female, or Prefer Not To Say.',
            //'employment_status.in' => 'Required employment status include Employed, or Not Employed.',
            //'education_level.in' => 'Required level of education include Primary, Secondary, Tertiary, Postgraduate, Diploma, High School, College, or A-Level.',
            //'marital_status.in' => 'Required marital status include Single, Married, Widowed, Divorced or Seperated.',
            //'facebook_url.url' => 'The Facebook page url must be a valid URL',
            //'linkedin_url.url' => 'The LinkedIn page url must be a valid URL',
            //'twitter_url.url' => 'The Twitter page url must be a valid URL',
            'language.exists' => 'The provided language not found',
            'country_id.exists' => 'The provided country not found',
            //'image.mimes' => 'Please insert image with jpeg/png formats only',
            //'image.max'   => 'Image should be less than 300 KB',
            //'image.dimensions' => 'Image Minimum Dimension is 100x100 and Max Dimension is 150x150',
            'category_id.exists' => 'The provided category not found',
            'email.regex' => 'Please use a company email.'
        ];
    }
}
