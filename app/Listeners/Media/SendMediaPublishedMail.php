<?php

declare(strict_types=1);

namespace App\Listeners\Media;

use App\Events\MediaPublished;
use App\Mail\MediaPublishedMail;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Role;

class SendMediaPublishedMail implements ShouldQueue
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

            Mail::to($superAdmins)->send(new MediaPublishedMail($event->media));
        }
    }
}
