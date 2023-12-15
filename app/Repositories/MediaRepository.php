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
    public function allApprovedMedias(): mixed
    {
        return $this->media->where('approved', true)->get();
    }

    /**
     * All media pending
     */
    public function allPendingMedias(): mixed
    {
        return $this->media->where('approved', false)->get();
    }

    public function paginate()
    {
        return $this->media->where('approved', true)->orderBy('created_at', 'desc')->paginate(3);
    }

    public function paginateByUser($id)
    {
        return $this->allApprovedMedias()->where('user_id', $id)->orderBy('created_at', 'desc')->paginate(3);
    }

    /**
     * Find media by id
     */
    public function find($id): Media
    {
        return $this->media->find($id);
    }

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
