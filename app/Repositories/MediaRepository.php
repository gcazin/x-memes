<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use App\Models\Media;
use Illuminate\Database\Eloquent\Collection;

class MediaRepository implements RepositoryInterface
{
    public function __construct(
        /** @var Media $media */
        protected Media $media
    ) {
    }

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
    public function allApprovedMedias($force = true): mixed
    {
        $model = $this->media->approved();

        return $force
            ? $model->get()
            : $model;
    }

    /**
     * Retrieves all pending media items.
     */
    public function allPendingMedias(): mixed
    {
        return $this->media->whereIsNotApproved()->orderByDesc('created_at')->get();
    }

    /**
     * Paginates all approved media items.
     *
     * @return mixed
     */
    public function paginate()
    {
        return $this->allApprovedMedias(false)
            ->orderByDesc('approved_at')
            ->paginate();
    }

    /**
     * Paginates all approved media items with selected tags.
     */
    public function paginateWithSelectedTags(string $tags)
    {
        return Media::withAnyTags(explode(',', $tags))
            ->whereIsApproved()
            ->orderByDesc('approved_at')
            ->paginate();
    }

    /**
     * Paginates all approved media items by user id.
     */
    public function paginateByUser($id)
    {
        return $this->allApprovedMedias(false)
            ->where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->paginate();
    }

    /**
     * Finds a media item by its id.
     */
    public function find($id): Media
    {
        return $this->media->find($id);
    }

    /**
     * Finds the first media item returned by the given key-value pair.
     */
    public function firstWhere($key, $value)
    {
        return $this->media->firstWhere($key, $value);
    }

    /**
     * Retrieves a random approved media item.
     */
    public function random()
    {
        return $this->allApprovedMedias()->random();
    }
}
