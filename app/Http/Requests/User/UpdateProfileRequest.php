<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
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
            'username' => [
                'required',
                'string',
                'max:25',
                'alpha_dash',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'description' => ['sometimes', 'nullable', 'string', 'max:255'],
            'avatar' => [
                'image',
                'sometimes',
                'nullable',
                'dimensions:ratio=1/1',
                File::types(['jpg,jpeg,png,webp'])
                    ->max('5mb'),
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'avatar.dimensions' => "L'avatar doit être carré. (ex: 500x500)",
        ];
    }
}
