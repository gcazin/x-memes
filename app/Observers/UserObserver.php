<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the Tag "created" event.
     */
    public function created(User $user): void
    {
        $user->update([
            'lang' => app()->getLocale(),
        ]);
    }

    /**
     * Handle the Tag "updated" event.
     */
    public function updated(): void
    {
        //
    }

    /**
     * Handle the Tag "deleted" event.
     */
    public function deleted(): void
    {
        //
    }
}
