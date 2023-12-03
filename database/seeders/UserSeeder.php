<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = ['super-admin', 'admin', 'moderator', 'guest'];
        // Super-admin

        foreach ($users as $user) {
            User::factory()
                ->create([
                    'name' => $user,
                    'email' => "${user}@${user}.fr",
                    'password' => $user,
                ])->assignRole(Role::all()->where('name', $user));
        }
    }
}
