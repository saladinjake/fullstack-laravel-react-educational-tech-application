<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCheckoutRequest extends FormRequest
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
             'checkout' => 'required|array',
             'checkout.*.item_id' => 'required|integer',
             'checkout.*.quantity' => 'required|integer',
         ];
     }

     public function messages()
     {
         return [
             'checkout.required' => 'Your checkout is empty.'
         ];
     }
}
