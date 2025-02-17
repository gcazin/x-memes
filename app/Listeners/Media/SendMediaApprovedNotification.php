<?php

declare(strict_types=1);

namespace App\Listeners\Media;

use App\Events\MediaApproved;
use App\Notifications\Media\ApprovedMediaNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendMediaApprovedNotification implements ShouldQueue
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
    public function handle(MediaApproved $event): void
    {
        if (! is_null($event->media->user_id)) {
            return;
        }

        $event->media->user->notify(new ApprovedMediaNotification($event->media));
    }
}
