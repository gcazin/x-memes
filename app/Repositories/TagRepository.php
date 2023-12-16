<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use Spatie\Tags\Tag;

class TagRepository implements RepositoryInterface
{
    public function __construct(
        protected Tag $tag
    ) {
    }

    public function all()
    {
        return $this->mapToLocaleTranslation($this->tag->all());
    }

    public function find($id)
    {
        return $this->tag->find($id);
    }

    protected function mapToLocaleTranslation($model)
    {
        return $model->map(function ($tag) {
            return ['name' => $tag->name];
        });
    }
}
