<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Badge;
use App\Models\BadgeType;
use App\Models\Media;
use App\Models\User;
use App\Services\UserService;

class MediaObserver
{
    public function __construct(
        public UserService $userService
    )
    {
    }

    /**
     * Handle the Media "created" event.
     */
    public function created(Media $media): void
    {
        $this->userService->attachBadge($media);
    }

    /**
     * Handle the Media "updated" event.
     */
    public function updated(Media $media): void
    {
        //
    }

    /**
     * Handle the Media "deleted" event.
     */
    public function deleted(Media $media): void
    {
        $user = User::find($media->user_id);
        $userMediasPublished = $user->medias()->count();
        $badgesToRemove = $user->badges->where('condition', '>', (string) $userMediasPublished)->pluck('id');
        $user->badges()->detach($badgesToRemove);

        if ($userMediasPublished === 0) {
            $user->badges()->detach();
        }
    }

    /**
     * Handle the Media "restored" event.
     */
    public function restored(Media $media): void
    {
        //
    }

    /**
     * Handle the Media "force deleted" event.
     */
    public function forceDeleted(Media $media): void
    {
        //
    }
}
