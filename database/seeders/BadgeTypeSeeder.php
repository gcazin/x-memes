<?php

namespace Database\Seeders;

use App\Models\BadgeType;
use Illuminate\Database\Seeder;

class BadgeTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BadgeType::create(['name' => 'seniority']);
        BadgeType::create(['name' => 'media']);
        BadgeType::create(['name' => 'role']);
    }
}
