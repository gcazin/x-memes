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
    public function find($id)
    {
        return $this->tag->find($id);
    }
}
