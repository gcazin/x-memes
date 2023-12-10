<?php

namespace App\Listeners\User;

use App\Models\User;
use App\Notifications\User\NewUserNotification;
use Illuminate\Support\Facades\Notification;

class SendNewUserNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $superAdmins = User::role('superadmin')->get();

        Notification::send($superAdmins, new NewUserNotification($event->user));
    }
}
