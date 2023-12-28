<?php

namespace App\Listeners;

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

        flash('success', 'Notification en real time');
    }
}
