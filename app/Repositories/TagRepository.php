<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use App\Models\Tag;
use Illuminate\Support\Facades\Cache;

class TagRepository implements RepositoryInterface
{
    public function __construct(
        protected Tag $tag
    ) {
    }

    /**
     * Retrieves all tag items.
     */
    public function all()
    {
        return $this->tag->all();
    }

    /**
     * Finds a tag item by its ID.
     */
    public function find($id)
    {
        return $this->tag->find($id);
    }

    /**
     * Finds the first tag item returned by the given key-value pair.
     */
    public function firstWhere($key, $value)
    {
        return $this->tag->firstWhere($key, $value);
    }

    /**
     * Retrieves a random approved tag item.
     */
    public function random()
    {
        return $this->all()->random();
    }
}
