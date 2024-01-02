<?php

namespace App\Services;

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
     * Approve the specified media.
     */
    public function approve(int $id)
    {
        $this->media = $this->mediaRepository->find($id);

        $this->media->approved = true;
        $this->media->approved_by = auth()->user()->id;
        $this->media->approved_at = now()->toDateTime();

        $this->media->update();

        return $this->media;
    }

    /**
     * Get the related medias.
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
