<?php

declare(strict_types=1);

namespace App\Interfaces;

interface RepositoryInterface
{
    public function all();

    public function find($id);

    public function firstWhere($key, $value);

    public function random();
}
