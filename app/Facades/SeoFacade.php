<?php

declare(strict_types=1);

namespace App\Facades;

use App\Models\User;
use Illuminate\Support\Facades\Facade;

/**
 * @method static hasPerform()
 * @method static reward(mixed $id, string $MEDIA_APPROVED)
 * @method static setUser(User $user)
 * @method static setDescription(string $string)
 * @method static setTitle(string $string)
 * @method static title(string $string)
 * @method static description(string $string)
 */
class SeoFacade extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'seo';
    }
}
