<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSubCategoryRequest extends FormRequest
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
            'name'      => 'required|min:3|max:191|string',
            'parent_id' => 'required|numeric|exists:categories,id'
        ];
    }

    public function messages()
    {
        return [
            'parent_id.exists' => 'The provided parent category not found',
        ];
    }
}
