<?php

declare(strict_types=1);

namespace App\Listeners\Media;

use App\Events\MediaPublished;
use App\Models\User;
use App\Notifications\Media\PublishedMediaNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;
use Spatie\Permission\Models\Role;

class SendMediaPublishedNotification implements ShouldQueue
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
    public function handle(MediaPublished $event): void
    {
        if (Role::all()->where('name', 'super-admin')->count() !== 0) {
            $superAdmins = User::role('super-admin')->get();

            Notification::send($superAdmins, new PublishedMediaNotification($event->media));
        }
    }
}
