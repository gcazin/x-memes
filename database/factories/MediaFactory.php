<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'filename' => Storage::allFiles('media')[array_rand(Storage::allFiles('media'))],
            'extension' => 'jpg',
            'hash' => '0000000000000000010001000100001011110111111111110011110000111100',
            'approved' => 1,
            'user_id' => 1,
        ];
    }
}
