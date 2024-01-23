<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class UserPoint extends Model
{
    protected $fillable = [
        'amount',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(PointType::class, 'point_type_id');
    }

    public function points(): MorphToMany
    {
        return $this->morphToMany(Point::class, 'pointable');
    }
}
