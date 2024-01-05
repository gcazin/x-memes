<?php

declare(strict_types=1);

namespace App\Listeners\Media;

use App\Events\MediaDestroyed;
use App\Notifications\Media\DeletedMediaNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendMediaDeletedNotification implements ShouldQueue
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
    public function handle(MediaDestroyed $event): void
    {
        $event->media->user->notify(new DeletedMediaNotification($event->media));
    }
}
