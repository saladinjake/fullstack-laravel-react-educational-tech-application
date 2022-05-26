<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateLearnerRequest extends FormRequest
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
        // $type = [
        //     'Learner', 'Instructor',
        // ];

        return [
            'first_name' => 'required|max:150|string',
            'last_name' => 'required|max:150|string',
            'email' => 'required|email|max:150|string|unique:users',
            'password' => 'required|min:8|confirmed',
            'phone_number' => 'required|max:20|unique:users',
            // 'account_type' => ['required', Rule::in($type)],
        ];
    }

    public function messages()
    {
        return [
            'password.regex' => 'Password should have a minimum of eight characters and at least one letter and one number',
            // 'account_type.in' => 'Required account type include Learner, or Instructor.',
        ];
    }
}
