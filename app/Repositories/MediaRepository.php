<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use App\Models\Media;
use Illuminate\Database\Eloquent\Collection;

class MediaRepository implements RepositoryInterface
{
    public function __construct(
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
        $model = $this->media->where('approved', true);

        return $force
            ? $model->get()
            : $model;
    }

    /**
     * All media pending
     */
    public function allPendingMedias(): mixed
    {
        return $this->media->where('approved', false)->get();
    }

    /**
     * Paginate medias
     *
     * @return mixed
     */
    public function paginate()
    {
        return $this->allApprovedMedias(false)
            ->where('approved', true)
            ->orderBy('created_at', 'desc')
            ->paginate(3);
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
            ->paginate(3);
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
