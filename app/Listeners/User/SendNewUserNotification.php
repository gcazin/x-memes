<?php

namespace App\Listeners\User;

use App\Models\User;
use App\Notifications\User\NewUserNotification;
use Illuminate\Support\Facades\Notification;
use Spatie\Permission\Models\Role;

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
        if (Role::all()->where('name', 'super-admin')->count() !== 0) {
            $superAdmins = User::role('super-admin')->get();

            Notification::send($superAdmins, new NewUserNotification($event->user));
        }
    }
}
