<?php

declare(strict_types=1);

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;
use Spatie\Permission\Traits\RefreshesPermissionCache;

class Role extends SpatieRole
{
    use RefreshesPermissionCache;

    protected $hidden = [
        'pivot',
    ];
}
