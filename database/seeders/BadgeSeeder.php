<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\BadgeType;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $createBadge = function($name, $description, $condition, $type) {
          return [
              $name,
              $description,
              'badges/'.$condition.'.png',
              $condition,
              $type,
          ];
        };

        $badges = [
            $createBadge('Apprenti posteur', 'Première image postée', 1, 'media'),
            $createBadge('Posteur confirmé', '5 images postées', 5, 'media'),
            $createBadge('Posteur avancé', '10 images postées', 10, 'media')
        ];
        $rolesBadges = [
            $createBadge(
                'Super-administrateur',
                'le tout puissant',
                'super-admin',
                'role'
            ),
            $createBadge(
                'Administrateur',
                'le tout puissant',
                'admin',
                'role'
            ),
            $createBadge(
                'Modérateur',
                'le tout puissant',
                'moderator',
                'role'
            ),
        ];
        foreach (array_merge($badges, $rolesBadges) as $badge) {
            Badge::create([
                'name' => $badge[0],
                'description' => $badge[1],
                'path' => $badge[2],
                'condition' => $badge[3],
                'badge_type_id' => BadgeType::all()->firstWhere('name', $badge[4])->id,
            ]);
        }
    }
}
