<?php

namespace App\Console\Commands;

use App\Mail\SendMailToAllUsers;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendEmailsToAllUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:all-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Permet d\'envoyer un mail à tous les utilisateurs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Début de l\'envoi des mails...');
        $users = User::all();

        /*$users->each(function ($user) {
           Mail::to($user)->send(new SendMailToAllUsers());
        });*/
        Mail::to(User::first())->send(new SendMailToAllUsers());

        $this->info($users->count() . ' emails ont été envoyés !');
    }
}
