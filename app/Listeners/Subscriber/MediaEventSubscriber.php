<?php

namespace App\Listeners\Subscriber;

use App\Events\MediaApproved;
use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Listeners\Media\SendMediaApprovedNotification;
use App\Listeners\Media\SendApprovedMediaNotification;
use App\Listeners\User\AssignBadgeToUser;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Events\Dispatcher;

class MediaEventSubscriber implements ShouldQueueAfterCommit
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
