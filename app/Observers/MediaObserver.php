<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Badge;
use App\Models\BadgeType;
use App\Models\Media;
use App\Models\User;

class MediaObserver
{
    /**
     * Handle the Media "created" event.
     */
    public function created(Media $media): void
    {
        $user = User::find($media->user_id);

        $userMediasPublished = $user->medias
            ->where('approved', true)
            ->count();

        $badgeType = BadgeType::all()->where('name', 'media');
        if ($badgeType->count() > 0) {
            $badge = Badge::all()
                ->where('condition', $userMediasPublished)
                ->firstWhere('badge_type_id', $badgeType->first()->id);

            if ($badge && $badge->exists) {
                $userBadge = $user->badges()->firstWhere('badge_id', $badge->id);
                if (! $userBadge) {
                    // Attach badge
                    $user->badges()->attach($badge->id);
                }
            }
        }

        $media->update([
            'lang' => app()->getLocale()
        ]);
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
