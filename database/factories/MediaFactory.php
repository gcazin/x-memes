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
        $files = Storage::disk('medias')->files();
        $filename = Storage::has('medias') && count($files) > 0
            ? $files[array_rand($files)]
            : 'medias/1.jpg';

        $extension = explode('.', $filename)[1];

        return [
            'name' => fake()->name,
            'path' => 'medias/'.$filename,
            'thumbnail_path' => $extension === 'mp4' ? 'medias/thumbnails/'.explode('.', $filename)[0].'.jpg' : null,
            'extension' => $extension,
            'hash' => $extension === 'mp4' ? null : 0000000000000000010001000100001011110111111111110011110000111100,
            'user_id' => User::all()->random()->id,
            'approved' => fake()->boolean,
            'download_count' => fake()->numberBetween(1, 1000),
        ];
    }
}
