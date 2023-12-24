<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UpdateProfileRequest extends FormRequest
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
            'username' => ['required', 'string', 'max:25'],
            'description' => ['sometimes', 'nullable', 'string', 'max:255'],
            'avatar' => [
                'image',
                'sometimes',
                'nullable',
                File::types(['jpg,jpeg,png,webp'])
                    ->max('5mb'),
            ],
        ];
    }
}
