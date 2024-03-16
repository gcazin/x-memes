<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Tags\HasTags;

class Post extends Model
{
    use HasFactory, HasTags;

    protected $with = [
        'user',
    ];

    protected $fillable = [
        'title',
        'summary',
        'content',
        'image',
        'slug',
        'is_draft',
        'lang',
        'user_id',
    ];

    protected $casts = [
        'is_draft' => 'boolean',
    ];

    protected $perPage = 6;

    /**
     * Defines a custom cast for the 'created_at' attribute to format its display.
     */
    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::make($value)->diffForHumans()
        );
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_draft', auth()->user()->isAdmin());
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
