<?php

namespace App\Http\Requests\Badge;

use App\Models\Badge;
use App\Models\BadgeType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBadgeRequest extends FormRequest
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
            'name' => ['string', 'required', 'max:100', Rule::unique(Badge::class)],
            'description' => ['string', 'required'],
            'condition' => ['string', Rule::unique(Badge::class)],
            'badge_type_id' => ['integer', Rule::exists(BadgeType::class, 'id')],
        ];
    }
}
