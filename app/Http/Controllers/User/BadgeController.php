<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BadgeController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(string $username): Response
    {
        $user = User::with('followers', 'badges')
            ->withCount('followings')
            ->firstWhere('username', $username);
        // TODO: refactoriser ce fichier
        $medias = $this->mediaRepository->paginateByUser($user->id);

        return Inertia::render('User/Badges', [
            'user' => $user,
            'medias' => $medias,
        ]);
    }
}
