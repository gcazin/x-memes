<?php

namespace App\Services;

use App\Models\Media;
use App\Repositories\MediaRepository;

class MediaService
{
    public function __construct(
        public MediaRepository $mediaRepository,
        public Media $media
    ) {
    }

    public function approve(int $id)
    {
        $this->media = $this->mediaRepository->find($id);

        $this->media->approved = true;
        $this->media->approved_by = auth()->user()->id;
        $this->media->approved_at = now()->toDateTime();

        $this->media->update();

        return $this->media;
    }
}
