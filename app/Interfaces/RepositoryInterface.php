<?php

declare(strict_types=1);

namespace App\Interfaces;

interface RepositoryInterface
{
    public function all();

    public function find(int $id);

    public function firstWhere(string $key, string $value);

    public function random();
}
