<?php

namespace Database\Factories;

use App\Models\User;
use DragonCode\Support\Facades\Helpers\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->words(asText: true);

        return [
            'title' => $title,
            'summary' => fake()->text,
            'content' => fake()->realText,
            'image' => 'posts/01HQN90FCDVT5QMW4NW10NWV8D.png',
            'slug' => Str::slug($title),
            'is_draft' => false,
            'user_id' => User::all()->random()->id,
        ];
    }
}
