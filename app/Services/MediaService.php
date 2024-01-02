<?php

declare(strict_types=1);

namespace App\Services;

use App\Events\MediaApproved;
use App\Models\Media;
use App\Repositories\MediaRepository;
use Illuminate\Http\RedirectResponse;

class MediaService
{
    public function __construct(
        public MediaRepository $mediaRepository,
        public Media $media
    ) {
    }

    /**
     * Approves the specified media.
     */
    public function approve(int $id): Media
    {
        $this->media = $this->mediaRepository->find($id);

        $this->media->approved = true;
        $this->media->approved_by = auth()->user()->id;
        $this->media->approved_at = now()->toDateTime();

        $this->media->update();

        MediaApproved::dispatch($this->media);

        return $this->media;
    }

    /**
     * Retrieves related media based on tags associated with the specified media.
     */
    public function related($id): RedirectResponse
    {
        $media = $this->mediaRepository->find($id);
        $tags = $media->tags->pluck('name')->toArray();

        $related = Media::withAnyTags($tags)
            ->get()
            ->where('id', '!=', $media->id)
            ->take(4);

        return back()->with('related', $related);
    }
}