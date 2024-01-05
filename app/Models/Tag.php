<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Tags\Tag as SpatieTag;

/**
 * @method find($id)
 */
class Tag extends SpatieTag
{
    use HasFactory;

    public static function getLocale()
    {
        return 'fr';
    }

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
}
