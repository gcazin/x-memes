<?php

namespace App\Listeners\User;

use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Models\Badge;
use App\Models\User;

class AssignBadgeToUser
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
    public function handleAssignBadge(MediaPublished $event): void
    {
        // Count user total medias published;
        /** @var User $user */
        $user = User::find($event->media->user_id);
        $userMediasPublished = $user->medias->where('approved', true)->count();
        $badge = Badge::all()->where('condition', $userMediasPublished)->first;
        $userBadge = $user->badges()->where('badge_id', $badge->id);

        // Attach badge
        if ($badge && ! $userBadge->exists()) {
            $user->badges()->attach($badge->id);
        }

        // If the user has deleted all of his images, all badges are removed.
        if ($userMediasPublished === 0) {
            $user->badges()->detach();
        }
    }

    public function handleRemoveBadge(MediaDestroyed $event): void
    {
        /**
         * If the user has posted several images,
         * and deletes one,
         * we check all the badges for which the condition to obtain is above the number of media published.
         */
        $user = User::find($event->media->user_id);
        $userMediasPublished = $user->medias->where('approved', true)->count();
        //        dd($userMediasPublished, $user->badges, $user->badges()->where('condition', '>', $userMediasPublished)->get());
        $badgesToRemove = $user->badges->where('condition', '>', $userMediasPublished)->pluck('id');
        $user->badges()->detach($badgesToRemove);
    }
}
