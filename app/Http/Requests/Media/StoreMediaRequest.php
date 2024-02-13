<?php

declare(strict_types=1);

namespace App\Http\Requests\Media;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StoreMediaRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'media_id' => [
                'required',
                File::types(['video/mp4,image/jpeg,image/png,image/gif,image/webp,image/avif'])
                    ->max('25mb'),
            ],
            'tags' => ['sometimes'],
        ];
    }
}
