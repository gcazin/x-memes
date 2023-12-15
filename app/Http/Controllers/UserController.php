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

    public function show(int $id)
    {
        $user = User::with('badges')->find($id);
        $medias = $this->mediaRepository->paginateByUser($id);

        return Inertia::render('User/Show', [
            'user' => $user,
            'medias' => $medias,
        ]);
    }
}
