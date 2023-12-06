<?php

namespace App\Interfaces;

interface RepositoryInterface
{
    public function all();

    public function find($id);
}
