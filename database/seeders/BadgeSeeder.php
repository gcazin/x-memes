<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                1
            ],
            [
                'Posteur confirmé',
                'Tu as posté ta 5ème image, wow!',
                5
            ],
            [
                'Posteur avancé Honey',
                'Tu as posté 3 images',
                3
            ]
        ];
        foreach ($badges as $badge) {
            Badge::create([
                'name' => $badge[0],
                'description' => $badge[1],
                'condition' => $badge[2]
            ]);
        }
    }
}
