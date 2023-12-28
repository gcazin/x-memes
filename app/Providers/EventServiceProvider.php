<?php

namespace App\Providers;

use App\Events\MediaApproved;
use App\Listeners\SendMediaApprovedNotification;
use App\Listeners\User\SendNewUserNotification;
use App\Models\Media;
use App\Observers\MediaObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

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
        ],
        MediaApproved::class => [
            SendMediaApprovedNotification::class,
        ],
    ];

    protected $subscribe = [
        //
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        Media::observe(MediaObserver::class);
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
