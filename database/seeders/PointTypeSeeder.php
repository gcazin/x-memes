<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\PointType;
use App\Models\User;
use Illuminate\Database\Seeder;

class PointTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            // Media
            [
                'name' => 'media_approved',
                'description' => 'Votre média image a été approuvé.',
                'count' => 10,
                'model' => Media::class,
            ],
            [
                'name' => 'user_liked_media',
                'description' => 'Un utilisateur a aimé votre média.',
                'count' => 4,
                'model' => Media::class,
            ],
            [
                'name' => 'media_downloaded',
                'description' => 'Un utilisateur a téléchargé votre média.',
                'count' => 2,
                'model' => Media::class,
            ],
            [
                'name' => 'media_seen',
                'description' => 'Vous avez regardé un média',
                'count' => 1,
                'model' => Media::class,
            ],

            // Following
            [
                'name' => 'user_following',
                'description' => 'Un utilisateur s\'est abonné à vous.',
                'count' => 5,
                'model' => User::class,
            ],
            [
                'name' => 'staff_user_following',
                'description' => 'Une personne de l\'équipe s\'est abonné à vous.',
                'count' => 20,
                'model' => User::class,
            ],

            // Misc
            [
                'name' => 'registered',
                'description' => 'Récompense d\'inscription',
                'count' => 10,
                'model' => User::class,
            ],
            [
                'name' => 'daily_login',
                'description' => 'Récompense de connexion quotidienne',
                'count' => 1,
                'model' => User::class,
            ],
        ];

        foreach ($types as $type) {
            PointType::create([
                'name' => $type['name'],
                'description' => $type['description'],
                'amount' => $type['count'],
                'model' => $type['model'],
            ]);
        }
    }
}
