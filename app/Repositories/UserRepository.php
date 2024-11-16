<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository implements RepositoryInterface
{
    public function __construct(
        protected User $user
    ) {}

    /**
     * Retrieves all user items.
     */
    public function all(): Collection
    {
        return $this->user->all();
    }

    public function paginate(): array|LengthAwarePaginator
    {
        return $this->user->paginate();
    }

    /**
     * Finds a user item by its ID.
     */
    public function find(int $id): User
    {
        return $this->user->find($id);
    }

    /**
     * Finds the first user item returned by the given key-value pair.
     */
    public function firstWhere(string $key, string $value): ?User
    {
        return $this->user->firstWhere($key, $value);
    }

    /**
     * Retrieves a random approved user item.
     */
    public function random(): User
    {
        return $this->all()->random();
    }
}
