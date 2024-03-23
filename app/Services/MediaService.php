<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\PointType;
use App\Events\MediaApproved;
use App\Facades\PointFacade;
use App\Models\Media;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use Illuminate\Database\Eloquent\Collection;

class MediaService
{
    public function __construct(
        protected MediaRepository $mediaRepository,
        protected TagRepository $tagRepository,
        protected Media $media
    ) {
        //
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

        PointFacade::reward($this->media->id, PointType::MEDIA_APPROVED);
        MediaApproved::dispatch($this->media);

        return $this->media;
    }

    /**
     * Retrieves related media based on tags associated with the specified media.
     */
    public function related(int $id): Collection
    {
        $media = $this->mediaRepository->find($id);
        $tags = $media->tags->pluck('name')->toArray();

        return Media::withAnyTags($tags)
            ->published()
            ->where('id', '!=', $media->id)
            ->where('lang', app()->getLocale())
            ->take(3)
            ->get();
    }

    /**
     * Get the available sort options
     */
    public function getSortOptions(): \Illuminate\Support\Collection
    {
        return collect([
            [
                'name' => 'Par date',
                'value' => 'created_at',
            ],
            [
                'name' => 'Par titre',
                'value' => 'name',
            ],
            [
                'name' => 'Par téléchargement',
                'value' => 'download_count',
            ],
        ]);
    }

    /**
     * Format tags to be always in lowercase
     */
    public function formatTags(array $tags): array
    {
        return array_map(fn (string $tag) => strtolower($tag), $tags);
    }
}
