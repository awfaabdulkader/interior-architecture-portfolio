<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EducationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            "year_start" => 'required|date_format:Y',
            "year_end" => 'required|date_format:Y|after_or_equal:year_start',
            'diploma' => 'required|string|max:255',
            'school' => 'required|string|max:255',
        ];
    }
}
