<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\PointType;
use App\Events\MediaApproved;
use App\Facades\PointFacade;
use App\Models\Media;
use App\Models\Tag;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MediaService
{
    public function __construct(
        protected MediaRepository $mediaRepository,
        protected TagRepository $tagRepository,
        protected Media $media
    ) {
    }

    public function byType(Request $request, string $type, ?string $title = null): array
    {
        $defaultSort = '-download_count';
        $medias = QueryBuilder::for(Media::class)
            ->where('type', $type)
            ->where('approved', true)
            ->where('lang', app()->getLocale())
            ->defaultSort($defaultSort);

        $sortBy = collect([
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
        if ($request->has('filters') || $request->has('sort')) {
            $medias
                ->allowedSorts($sortBy->pluck('value')->toArray());

            if ($request->has('filters.tags')) {
                $medias
                    ->whereHas('tags', function ($query) use ($request) {
                        $query->whereIn('id', explode(',', $request->query('filters')['tags']));
                    })
                    ->allowedFilters(AllowedFilter::exact('tags.id'));
            }
        }

        $tags = Tag::query()
            ->whereHas('medias', fn ($query) => $query->where('type', '=', $type))
            ->whereLocale('name', app()->getLocale())
            ->get();

        return [
            'title' => $title ?: "Bibliothèque d'images",
            'medias' => $medias->paginate(),
            'tags' => $tags,
            'sortBy' => $sortBy->toArray(),
            'defaultSort' => $defaultSort,
            'duplicatedImage' => session('duplicatedImage'),
        ];
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
    public function related($id)
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
     * Format tags to be always in lowercase
     */
    public function formatTags($tags): array
    {
        return array_map(fn ($tag) => strtolower($tag), $tags);
    }
}
