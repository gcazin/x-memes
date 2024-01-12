<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class GenerateNameForUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'name:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Permet de générer les noms des utilisateurs pour la migration qui a ajouté une colonne nom.';

    /**
     * Hidden by default from the route:list.
     *
     * @var bool
     */
    protected $hidden = true;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::all()->filter(function ($user) {
            return is_null($user->name);
        });

        if ($user->isEmpty()) {
            $this->error("Aucun utilisateur n'ayant aucun nom n'a été trouvé");

            return 1;
        }

        $user->each(function ($u) {
            $u->name = str()->slug($u->username);

            $u->update();
        });

        $this->info("{$user->count()} noms d'utilisateurs ont été générés.");
    }
}
