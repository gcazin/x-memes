<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Scout\Searchable;
use Overtrue\LaravelLike\Traits\Likeable;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Tags\HasTags;

/**
 * @property mixed $id
 * @property bool $approved
 * @property int $approved_by
 * @property DateTime $approved_at
 * @property int $download_count
 * @property string $filename
 * @property string $name
 * @property mixed|string $lang
 *
 * @method static create(array $array)
 */
class Media extends Model implements Sitemapable
{
    use HasFactory, HasTags, Likeable, Searchable;

    protected $table = 'medias';

    protected $withCount = [
        'comments',
    ];

    protected $with = [
        'user',
        'likers',
    ];

    protected $fillable = [
        'name',
        'path',
        'thumbnail_path',
        'extension',
        'type',
        'hash',
        'approved',
        'approved_by',
        'approved_at',
        'download_count',
        'slug',
        'user_id',
        'lang',
    ];

    protected $hidden = [
        'hash',
    ];

    protected $casts = [
        'approved' => 'boolean',
        'download_count' => 'integer',
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

    /**
     * Defines a custom cast for the 'updated_at' attribute to format its display.
     */
    public function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::make($value)->diffForHumans()
        );
    }

    /**
     * Defines a custom cast for the 'approved_at' attribute to format its display.
     */
    public function approvedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::make($value)->diffForHumans() : null,
        );
    }

    /**
     * Checks if the media item is approved.
     */
    protected function isApproved(): bool
    {
        return $this->approved === true;
    }

    /**
     * Scope a query to only include approved media items.
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('approved', true);
    }

    /**
     * Scope a query to only include not approved media items.
     */
    public function scopeNotPublished(Builder $query): void
    {
        $query->where('approved', false);
    }

    /**
     * Determine if the media should be searchable.
     */
    public function shouldBeSearchable(): bool
    {
        return $this->isApproved();
    }

    /**
     * Get the URL for the media item in the sitemap.
     */
    public function toSitemapTag(): string
    {
        return route('media.show', $this->slug);
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
            't.name' => '',
        ];
    }

    /**
     * Represents the user who uploaded the media item.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Represents the tags associated with the media item.
     */
    public function tags(): MorphToMany
    {
        return $this
            ->morphToMany(self::getTagClassName(), 'taggable', 'taggables', null, 'tag_id')
            ->orderBy('order_column');
    }

    /**
     * Represents the points associated with the media item.
     *
     * @return MorphMany The relationship instance.
     */
    public function points(): MorphMany
    {
        return $this->morphMany(UserPoint::class, 'pointable');
    }

    /**
     * Represents the comments associated with the media item.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
