<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Scout\Searchable;
use Overtrue\LaravelLike\Traits\Likeable;
use Spatie\Tags\HasTags;

class Media extends Model
{
    use HasFactory, HasTags, Likeable, Searchable;

    protected $table = 'medias';

    protected $with = [
        'user',
        'tags',
        'likers',
    ];

    protected $fillable = [
        'name',
        'filename',
        'extension',
        'hash',
        'approved',
        'approved_by',
        'approved_at',
        'download_count',
        'user_id',
    ];

    protected $casts = [
        'approved' => 'boolean',
        'download_count' => 'integer',
    ];

    protected $perPage = 6;

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::make($value)->format('d/m/y')
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->with('roles');
    }

    public function tags(): MorphToMany
    {
        return $this
            ->morphToMany(self::getTagClassName(), 'taggable', 'taggables', null, 'tag_id')
            ->orderBy('order_column');
    }
}
