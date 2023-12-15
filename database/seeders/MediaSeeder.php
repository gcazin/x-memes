<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Media::factory(100)->create([
            'extension' => 'png',
            'hash' => '0000000000000000010001000100001011110111111111110011110000111100',
        ]);
    }
}
