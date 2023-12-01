<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $super_admin = User::factory()
        ->create([
            'name' => 'admin',
            'email' => 'admin@admin.fr',
            'password' => 'admin',
        ]);

        $super_admin->assignRole(Role::all()->where('name', 'super-admin'));

        // Guest
        $user = User::factory()
            ->create([
                'name' => 'guest',
                'email' => 'guest@guest.com',
                'password' => '1234',
            ]);
        $user->assignRole(Role::all()->where('name', 'guest'));
    }
}
