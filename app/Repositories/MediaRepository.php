<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use App\Models\Media;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class MediaRepository implements RepositoryInterface
{
    public function __construct(
        /** @var Media $media */
        protected Media $media
    ) {}

    /**
     * Retrieves all media items.
     */
    public function all(): Collection
    {
        return $this->media->all();
    }

    /**
     * Retrieves all approved and published media items.
     */
    public function allApprovedMedias(bool $force = true): mixed
    {
        $model = $this->media->published()->where('lang', app()->getLocale());

        return $force
            ? $model->get()
            : $model;
    }

    /**
     * Retrieves all pending media items.
     */
    public function allPendingMedias(): mixed
    {
        return $this->media->notPublished()->orderByDesc('created_at')->get();
    }

    /**
     * Paginates all approved media items.
     */
    public function paginate(): mixed
    {
        return $this->allApprovedMedias(false)
            ->orderByDesc('approved_at')
            ->paginate();
    }

    /**
     * Paginates all approved media items with selected tags.
     */
    public function paginateWithSelectedTags(string $tags): LengthAwarePaginator
    {
        return Media::withAnyTags(explode(',', $tags))
            ->published()
            ->orderByDesc('approved_at')
            ->paginate();
    }

    /**
     * Paginates all approved media items by user id.
     */
    public function paginateByUser(int $id): LengthAwarePaginator
    {
        return $this->allApprovedMedias(false)
            ->where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->paginate();
    }

    /**
     * Finds a media item by its id.
     */
    public function find(int $id): Media
    {
        return $this->media->find($id);
    }

    /**
     * Finds the first media item returned by the given key-value pair.
     */
    public function firstWhere(string $key, string $value): ?Media
    {
        return $this->media->firstWhere($key, $value);
    }

    /**
     * Retrieves a random approved media item.
     */
    public function random(): Media
    {
        return $this->allApprovedMedias()->random();
    }
}
