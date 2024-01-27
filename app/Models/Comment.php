<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Overtrue\LaravelLike\Traits\Likeable;

class Comment extends Model
{
    use HasFactory, Likeable;

    protected $with = [
        'user',
        'likers',
        'replies',
    ];

    protected $fillable = [
        'content',
        'user_id',
        'media_id',
        'parent_id',
    ];

    /**
     * Defines a custom cast for the 'created_at' attribute to format its display.
     */
    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::make($value)->diffForHumans()
        );
    }

    /**
     * Defines a custom cast for the 'updated_at' attribute to format its display.
     */
    public function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::make($value)->diffForHumans()
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}
