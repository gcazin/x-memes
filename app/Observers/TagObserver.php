<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Tag;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Support\Facades\Cache;

class TagObserver implements ShouldHandleEventsAfterCommit
{
    /**
     * Handle the Tag "created" event.
     */
    public function created(): void
    {
        Cache::forget('tags');
    }

    /**
     * Handle the Tag "updated" event.
     */
    public function updated(): void
    {
        Cache::forget('tags');
    }

    /**
     * Handle the Tag "deleted" event.
     */
    public function deleted(): void
    {
        Cache::forget('tags');
    }
}
