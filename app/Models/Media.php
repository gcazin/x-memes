<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Tags\HasTags;

class Media extends Model
{
    use HasFactory, HasTags;

    protected $table = 'medias';

    protected $with = [
        'user',
        'tags',
    ];

    protected $fillable = [
        'name',
        'filename',
        'extension',
        'hash',
        'approved',
        'download_count',
        'user_id',
    ];

    protected $casts = [
        'approved' => 'boolean',
        'download_count' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->with('roles');
    }
}
