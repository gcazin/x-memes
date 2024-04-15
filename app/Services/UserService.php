<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Badge;
use App\Models\BadgeType;
use App\Models\Media;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class UserService
{
    /**
     * Creates a thumbnail for the given UploadedFile and saves it to the specified path.
     */
    public function create(
        string $username,
        string $email,
        ?string $password = null,
        ?array $socialUsername = []
    ): User {
        return User::create([
            'name' => str()->slug($username),
            'username' => $username,
            'email' => $email,
            'password' => $password ?? Str::random(),
            'avatar' => 'avatar-placeholder/'.rand(1, 4).'.jpg',
            'x_username' => array_key_first($socialUsername) === 'twitter' ? $socialUsername['twitter'] : null,
            'github_username' => array_key_first($socialUsername) === 'github' ? $socialUsername['github'] : null,
        ]);
    }

    public function attachBadge(Media $media): void
    {
        $user = User::find($media->user_id);

        $userMediasPublished = $user->medias()->count();

        $badgeType = BadgeType::all()->where('name', 'media');
        if ($badgeType->count() > 0) {
            $badge = Badge::all()
                ->where('condition', $userMediasPublished)
                ->firstWhere('badge_type_id', $badgeType->first()->id);

            if ($badge && $badge->exists) {
                $userBadge = $user->badges()->firstWhere('badge_id', $badge->id);
                if (! $userBadge) {
                    // Attach badge
                    $user->badges()->attach($badge->id);
                }
            }
        }

        $media->update([
            'lang' => app()->getLocale(),
        ]);
    }
}
