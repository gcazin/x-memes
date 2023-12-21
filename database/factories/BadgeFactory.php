<?php

namespace Database\Factories;

use App\Models\BadgeType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Badge>
 */
class BadgeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name,
            'description' => fake()->text(),
            'path' => 'storage/badges/1.png',
            'condition' => fake()->randomDigit(),
            'badge_type_id' => BadgeType::all()->random()->id,
        ];
    }
}
