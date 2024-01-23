<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static firstWhere(string $string, string $action)
 */
class PointType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'count',
    ];
}
