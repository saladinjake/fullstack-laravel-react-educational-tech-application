<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBusinessMemberRequest extends FormRequest
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
            'first_name' => 'required|max:150|string',
            'last_name' => 'required|max:150|string',
            'email' => 'required|email|max:150|string|unique:users',
            'phone_number' => 'required|max:20',
            'staff_no' => 'sometimes|string|max:191',
            'job_designation' => 'sometimes|string|max:191'
        ];
    }
}
