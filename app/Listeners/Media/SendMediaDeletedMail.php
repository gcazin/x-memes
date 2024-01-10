<?php

declare(strict_types=1);

namespace App\Listeners\Media;

use App\Events\MediaDestroyed;
use App\Mail\MediaDeletedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendMediaDeletedMail implements ShouldQueue
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
        Mail::to($event->media->user)->send(new MediaDeletedMail($event->media));
    }
}
