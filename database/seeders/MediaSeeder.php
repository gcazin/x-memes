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
        Media::factory(10)->create([
            'extension' => 'png',
            'hash' => '0000000000000000010001000100001011110111111111110011110000111100',
            'approved' => 1,
            'user_id' => 1,
        ]);

        Media::factory(10)->create([
            'extension' => 'png',
            'hash' => '0000000000000000010001000100001011110111111111110011110000111100',
            'approved' => 0,
            'user_id' => 2,
        ]);
    }
}
