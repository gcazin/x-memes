<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class UsernameInLowercase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:username-lowercase';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Username majuscule vers miniscule';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info('Début de la mise à jour des noms d\'utilisateurs...');

        $users = User::all();
        $users->each(function (User $user) {
            $this->info($user->username.' changé en '.strtolower($user->username));
            $user->username = strtolower($user->username);
            $user->update();
        });

        $this->info('Fin de la mise à jour des noms d\'utilisateurs !');
    }
}
