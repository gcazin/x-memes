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
    ) {}

    /**
     * All medias
     *
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->media->all();
    }

    /**
     * All medias with theirs relations
     *
     * @param ...$with
     * @return Collection|array
     */
    public function allWith(...$with): Collection|array
    {
        return $this->media->with($with)->get();
    }

    /**
     * Find media by id
     *
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->media->find($id);
    }

    /**
     * All media approved and published
     *
     * @return mixed
     */
    public function allApprovedMedias(): mixed
    {
        return $this->media->where('approved', true)->get();
    }

    /**
     * All media pending
     *
     * @return mixed
     */
    public function allPendingMedias(): mixed
    {
        return $this->media->where('approved', false)->get();
    }
}
