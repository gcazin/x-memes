<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $badges = [
            [
                'Apprenti posteur',
                'Tu as posté ta première image, félicitations!',
                'badges/1.png',
                1,
            ],
            [
                'Posteur confirmé',
                'Tu as posté ta 5ème image, wow!',
                'badges/1.png',
                5,
            ],
        ];
        foreach ($badges as $badge) {
            Badge::create([
                'name' => $badge[0],
                'description' => $badge[1],
                'filename' => $badge[2],
                'condition' => $badge[3],
            ]);
        }
    }
}
