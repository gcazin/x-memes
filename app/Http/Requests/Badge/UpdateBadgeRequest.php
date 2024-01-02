<?php

declare(strict_types=1);

namespace App\Http\Requests\Badge;

use App\Models\Badge;
use App\Models\BadgeType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBadgeRequest extends FormRequest
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
            'name' => ['string', 'required', 'max:100'],
            'description' => ['string', 'sometimes'],
            'condition' => ['integer', Rule::unique(Badge::class, 'name')],
            'badge_type_id' => ['integer', Rule::exists(BadgeType::class), 'sometimes'],
        ];
    }
}
