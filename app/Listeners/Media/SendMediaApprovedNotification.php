<?php

namespace App\Listeners\Media;

use App\Events\MediaApproved;
use App\Notifications\Media\ApprovedMediaNotification;

class SendMediaApprovedNotification
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
        $event->media->user->notify(new ApprovedMediaNotification($event->media));
    }
}
