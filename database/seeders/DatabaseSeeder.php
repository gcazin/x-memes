<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            BadgeTypeSeeder::class,
            BadgeSeeder::class,
            UserSeeder::class,
            PointTypeSeeder::class,
        ]);

        if (config('app.env') === 'local') {
            $this->call([
                MediaSeeder::class,
                CommentSeeder::class,
            ]);

            \Artisan::call('user:reward');
        }
    }
}
