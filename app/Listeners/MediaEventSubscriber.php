<?php

namespace App\Listeners;

use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Models\Media;
use Illuminate\Events\Dispatcher;

class MediaEventSubscriber
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
        //
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            MediaPublished::class,
            [AssignBadgeToUser::class, 'handleAssignBadge']
        );

        $events->listen(
            MediaDestroyed::class,
            [AssignBadgeToUser::class, 'handleRemoveBadge']
        );
    }
}
