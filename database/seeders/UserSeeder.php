<?php

namespace Database\Seeders;

use App\Models\Badge;
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
        $users = ['super-admin', 'admin', 'moderator'];

        collect($users)->each(function ($user) {
            User::factory()
                ->create([
                    'username' => $user,
                    'email' => "{$user}@{$user}.fr",
                    'password' => $user,
                ])
                ->assignRole(Role::all()->where('name', $user))
                ->badges()
                ->attach(Badge::all()->firstWhere('condition', $user)->id);
        });

        if (config('app.env') !== 'production') {
            User::factory(50)->create()->chunk(10);

            /*foreach (User::all() as $user) {
                if ($user->id !== 1) {
                    $user->toggleFollow(User::find(1));
                }
            }*/
        }
    }
}
