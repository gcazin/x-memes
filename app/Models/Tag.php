<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\Tag as SpatieTag;

/**
 * @method find($id)
 */
class Tag extends SpatieTag
{
    protected $withCount = [
        'medias',
    ];

    /**
     * Get the translation.
     */
    public function toArray(): array
    {
        $attributes = parent::toArray();
        foreach ($this->getTranslatableAttributes() as $name) {
            in_array($name, array_keys($attributes), true) ?
                $attributes[$name] = $this->getTranslation($name, app()->getLocale()) : '';
        }

        return $attributes;
    }

    public function medias(): MorphToMany
    {
        return $this->morphedByMany(Media::class, 'taggable');
    }
}
