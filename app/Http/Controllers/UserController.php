<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\MediaRepository;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    public function show(string $username)
    {
        $user = User::with('badges', 'medias')->where('username', $username)->first();
        $medias = $this->mediaRepository->paginateByUser($user->id);

        return Inertia::render('User/Show', [
            'user' => $user,
            'medias' => $medias,
        ]);
    }
}
