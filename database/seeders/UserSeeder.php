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
        $users = ['superadmin', 'admin', 'moderator', 'guest'];

        foreach ($users as $user) {
            User::factory()
                ->create([
                    'username' => $user,
                    'email' => "${user}@${user}.fr",
                    'password' => $user,
                ])->assignRole(Role::all()->where('name', $user));
        }

        User::factory()->create()->assignRole('guest');
    }
}
