<?php

declare(strict_types=1);

namespace App\Providers;

use App\Events\MediaApproved;
use App\Events\MediaDestroyed;
use App\Events\UserFollowed;
use App\Listeners\Media\SendMediaApprovedMail;
use App\Listeners\Media\SendMediaApprovedNotification;
use App\Listeners\Media\SendMediaDeletedMail;
use App\Listeners\Media\SendMediaDeletedNotification;
use App\Listeners\User\SendNewFollowerNotification;
use App\Listeners\User\SendNewUserNotification;
use App\Listeners\User\SendWelcomeToNewUserMail;
use App\Models\Media;
use App\Models\Tag;
use App\Models\User;
use App\Observers\MediaObserver;
use App\Observers\TagObserver;
use App\Observers\UserObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
            SendNewUserNotification::class,
            SendWelcomeToNewUserMail::class,
        ],
        MediaApproved::class => [
            SendMediaApprovedNotification::class,
            SendMediaApprovedMail::class,
        ],
        MediaDestroyed::class => [
            SendMediaDeletedNotification::class,
            SendMediaDeletedMail::class,
        ],

        UserFollowed::class => [
            SendNewFollowerNotification::class,
        ],
    ];

    protected $subscribe = [
        //
    ];

    protected $observers = [
        Media::class => [
            // Conditionally assign badge to user.
            MediaObserver::class,
        ],
        Tag::class => [
            // Handle the tags caching.
            TagObserver::class,
        ],
        User::class => [
            // Handle the users caching.
            UserObserver::class
        ]
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
