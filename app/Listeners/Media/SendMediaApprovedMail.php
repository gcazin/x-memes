<?php

namespace App\Listeners\Media;

use App\Events\MediaApproved;
use App\Mail\MediaApprovedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendMediaApprovedMail implements ShouldQueue
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
        Mail::to($event->media->user)->send(new MediaApprovedMail($event->media));
    }
}
