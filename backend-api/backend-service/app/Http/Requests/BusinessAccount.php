<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BusinessAccount extends FormRequest
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
      $no_of_employees = [
          '0 - 10', '10 - 20', '20 - 30', '30 - 40', '40 - 50', '50 - 100', '100 above',
      ];

      $type_of_institution = [
        'Tertiary', 'Polytechnic', 'Secondary'
      ];

        return [
        'first_name' => 'required|max:255|string',
        'last_name' => 'required|max:255|string',
        'email' => ['required', 'email', 'max:191', 'string', 'regex:/^\w+[-\.\w]*@(?!(?:outlook|gmail|hotmail|yahoo)\.com$)\w+[-\.\w]*?\.\w{2,4}$/', 'unique:users'],
        'password' => 'required|string|min:8',
        'phone_number' => 'required|string|unique:users',
        'company_name' => 'required|string|min:5|max:50|unique:business_profiles',
        'hq_address' => 'string|min:5|max:255',
        'no_of_employees' => ['required', Rule::in($no_of_employees)],
        'type_of_institution' => ['string', Rule::in($type_of_institution)],
        'country_id' => 'required|integer|exists:countries,id',
        'industry_id' => 'required|integer|exists:industries,id',
        'country_code' => 'integer|exists:countries,phonecode',
        'company_phone' => 'required|string|unique:business_profiles',
        'registration_number' => 'required|string|unique:business_profiles',
        'company_logo' => 'nullable|image|mimes:jpg,jpeg,png|max:300|dimensions:min_width=100,min_height=100,max_width=150,max_height=150',
      ];
    }

    public function messages()
    {
        return [
        'company_name.unique' => 'A company with this name already exists',
        'phone_number.unique' => 'A user with this phone number already exists',
        'company_phone.unique' => 'A company with this number already exists',
        'country_code.exists' => 'The provided phone code not found',
        'country_id.exists' => 'The provided country not found',
        'industry_id.exists' => 'The provided industry not found',
        'no_of_employees.in' => 'Invalid selection.',
        'type_of_institution.in' => 'Available Institutions include: Tertiary, Polytechnic and Secondary schools.',
        'email.regex' => 'Please use a company email.'
    ];
    }
}
