<?php

namespace App\Observers;

use App\Models\Badge;
use App\Models\Media;
use App\Models\User;

class MediaObserver
{
    /**
     * Handle the Media "created" event.
     */
    public function created(Media $media): void
    {
        // Count user total medias published;
        /** @var User $user */
        $user = User::find($media->user_id);
        $userMediasPublished = $user->medias->where('approved', true)->count();
        $badge = Badge::all()->where('condition', $userMediasPublished)->first;
        $userBadge = $user->badges()->where('badge_id', $badge->id);

        // Attach badge
        if ($badge && ! $userBadge->exists()) {
            $user->badges()->attach($badge->id);
        }
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
        $userMediasPublished = $user->medias->where('approved', true)->count();
        $badgesToRemove = $user->badges->where('condition', '>', $userMediasPublished)->pluck('id');
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
