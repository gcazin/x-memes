<?php

declare(strict_types=1);

namespace App\Listeners\User;

use App\Events\UserFollowed;
use App\Notifications\User\NewFollowerNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendNewFollowerNotification implements ShouldQueue
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
    public function handle(UserFollowed $event): void
    {
        $event->followable->notify(new NewFollowerNotification($event->follower));
    }
}
