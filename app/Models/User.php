<?php

declare(strict_types=1);

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;
use Overtrue\LaravelFollow\Traits\Followable;
use Overtrue\LaravelFollow\Traits\Follower;
use Overtrue\LaravelLike\Traits\Liker;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser
{
    use Followable, Follower, HasApiTokens, HasFactory, HasRoles, Liker, Notifiable, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'description',
        'avatar',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * The relationships to always eager-load.
     */
    protected $with = [
        'roles:id,name',
        'followers',
    ];

    protected $perPage = 10;

    /**
     * Checks if the user has the 'super-admin' role.
     */
    public function isSuperAdmin(): bool
    {
        return $this->hasRole('super-admin');
    }

    /**
     * Checks if the user has the 'admin' role.
     */
    public function isAdmin(): bool
    {
        return $this->isSuperAdmin() || $this->hasRole('admin');
    }

    /**
     * Checks if the user has the 'moderator' role.
     */
    public function isModerator(): bool
    {
        return $this->isAdmin() || $this->hasRole('moderator');
    }

    /**
     * Defines a custom cast for the 'created_at' attribute to format its display.
     */
    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->format('d/m/Y h:i')
        );
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        return [
            'username' => $this->username,
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin();
    }

    /**
     * Defines a one-to-many relationship with the Media model,
     * representing the user's uploaded media.
     */
    public function medias(): HasMany
    {
        return $this->hasMany(Media::class, 'user_id');
    }

    /**
     * Defines a many-to-many relationship with the Badge model,
     * representing the user's earned badges.
     */
    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class);
    }
}
