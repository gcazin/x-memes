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
        if (config('app.env') === 'production') {
            $this->call([
                RoleSeeder::class,
                BadgeTypeSeeder::class,
                BadgeSeeder::class,
                UserSeeder::class,
            ]);
        } else {
            $this->call([
                RoleSeeder::class,
                BadgeTypeSeeder::class,
                BadgeSeeder::class,
                UserSeeder::class,
                MediaSeeder::class,
            ]);
        }
    }
}
