<?php

declare(strict_types=1);

namespace App\Services;

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
    ) {
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
}
