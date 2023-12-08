<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
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
        // Super-admin

        foreach ($users as $user) {
            User::factory()
                ->create([
                    'username' => $user,
                    'email' => "${user}@${user}.fr",
                    'password' => $user,
                    'email_verified_at' => Carbon::now(),
                ])->assignRole(Role::all()->where('name', $user));
        }
    }
}
