<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

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
        $filename = Storage::has('media') && count(Storage::allFiles()) > 0
            ? Storage::allFiles('media')[array_rand(Storage::allFiles('media'))]
            : 'media/1.jpg';

        return [
            'name' => fake()->name,
            'filename' => $filename,
            'extension' => 'jpg',
            'hash' => '0000000000000000010001000100001011110111111111110011110000111100',
            'user_id' => User::all()->random()->id,
            'approved' => fake()->boolean,
            'download_count' => fake()->numberBetween(1, 1000),
        ];
    }
}
