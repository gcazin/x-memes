<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;

class TagRepository implements RepositoryInterface
{
    public function __construct(
        protected Tag $tag
    ) {
    }

    /**
     * Retrieves all tag items.
     */
    public function all(): Collection
    {
        return $this->tag->all();
    }

    /**
     * Finds a tag item by its ID.
     */
    public function find(int $id): Tag
    {
        return $this->tag->find($id);
    }

    /**
     * Finds the first tag item returned by the given key-value pair.
     */
    public function firstWhere(string $key, string $value): ?Tag
    {
        return $this->tag->firstWhere($key, $value);
    }

    /**
     * Retrieves a random approved tag item.
     */
    public function random(): Tag
    {
        return $this->all()->random();
    }
}
