<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Media::factory(50)
            ->create()
            ->each(fn ($media) => $media->attachTag(fake()->boolean ? 'humour' : 'meme'));
    }
}
