<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserRepository implements RepositoryInterface
{
    public function __construct(
        protected User $user
    ) {
    }

    /**
     * Retrieves all user items.
     */
    public function all(): Collection
    {
        return $this->user->all();
    }

    /**
     * Finds a user item by its ID.
     */
    public function find($id)
    {
        return $this->user->find($id);
    }

    /**
     * Finds the first user item returned by the given key-value pair.
     */
    public function firstWhere($key, $value)
    {
        return $this->user->firstWhere($key, $value);
    }

    /**
     * Retrieves a random approved user item.
     */
    public function random()
    {
        return $this->all()->random();
    }
}
