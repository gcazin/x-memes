<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (! app()->isProduction()) {
            for ($i = 0; $i <= 10; $i++) {
                DB::table('medias')->insert([
                    'name' => 'Title',
                    'filename' => 'media/AvWsqIqRnzO7ULgnFeYyFhuw2TwJYd6GExZTLFlf.jpg',
                    'extension' => 'jpg',
                    'hash' => '0000000000000000010001000100001011110111111111110011110000111100',
                    'approved' => 1,
                    'user_id' => 1,
                ]);
            }
        }
    }
}
