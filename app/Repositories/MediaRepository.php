<?php

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
     * All medias
     */
    public function all(): Collection
    {
        return $this->media->all();
    }

    /**
     * All media approved and published
     */
    public function allApprovedMedias($force = true): mixed
    {
        $model = $this->media->whereApproved();

        return $force
            ? $model->get()
            : $model;
    }

    /**
     * All media pending
     */
    public function allPendingMedias(): mixed
    {
        return $this->media->whereIsNotApproved()->get();
    }

    /**
     * Paginate medias
     *
     * @return mixed
     */
    public function paginate()
    {
        return $this->allApprovedMedias(false)
            ->orderByDesc('approved_at')
            ->paginate();
    }

    public function paginateWithSelectedTags(string $tags)
    {
        return Media::withAnyTags(explode(',', $tags))
            ->whereIsApproved()
            ->orderByDesc('approved_at')
            ->paginate();
    }

    /**
     * Paginate medias by user
     *
     * @return mixed
     */
    public function paginateByUser($id)
    {
        return $this->allApprovedMedias(false)
            ->where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->paginate();
    }

    /**
     * Find media by id
     */
    public function find($id): Media
    {
        return $this->media->find($id);
    }

    /**
     * Find the first element returned by where
     *
     * @return mixed
     */
    public function firstWhere($key, $value)
    {
        return $this->media->firstWhere($key, $value);
    }

    /**
     * Returns random media
     */
    public function random(): Media
    {
        return $this->allApprovedMedias()->random();
    }
}
