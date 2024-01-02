<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Badge extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $with = [
        'users',
        'type',
    ];

    protected $fillable = [
        'name',
        'description',
        'path',
        'condition',
        'badge_type_id',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function type(): HasOne
    {
        return $this->hasOne(BadgeType::class, 'id', 'badge_type_id');
    }
}
