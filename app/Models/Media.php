<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Tags\HasTags;
use Spatie\Tags\Tag;

class Media extends Model
{
    use HasFactory, HasTags;

    protected $table = 'medias';

    protected $with = [
        'user',
        'tags'
    ];

    protected $fillable = [
        'name',
        'filename',
        'extension',
        'approved',
        'hash',
        'user_id',
    ];

    protected $casts = [
        'approved' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->with('roles');
    }
}
