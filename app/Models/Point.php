<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Point extends Model
{
    protected $fillable = [
        'amount',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
