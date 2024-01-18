<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
 *
 * @method static create(array $array)
 */
class Media extends Model implements Sitemapable
{
    use HasFactory, HasTags, Likeable, Searchable;

    protected $table = 'medias';

    protected $with = [
//        'user',
//        'tags',
//        'likers',
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
    ];

    protected $hidden = [
        'hash',
    ];

    protected $casts = [
        'approved' => 'boolean',
        'download_count' => 'integer',
    ];

    protected $perPage = 6;

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::make($value)->diffForHumans()
        );
    }

    public function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::make($value)->diffForHumans()
        );
    }

    protected function isApproved(): bool
    {
        return $this->approved === true;
    }

    public function whereApproved()
    {
        return $this->where('approved', true);
    }

    public function whereIsNotApproved()
    {
        return $this->where('approved', false);
    }

    /**
     * Determine if the media should be searchable.
     */
    public function shouldBeSearchable(): bool
    {
        return $this->isApproved();
    }

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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->without('medias');
    }

    public function tags(): MorphToMany
    {
        return $this
            ->morphToMany(self::getTagClassName(), 'taggable', 'taggables', null, 'tag_id')
            ->orderBy('order_column');
    }
}
