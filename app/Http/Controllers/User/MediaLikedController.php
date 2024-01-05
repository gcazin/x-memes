<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaLikedController extends Controller
{
    public function __construct(
        protected UserRepository $userRepository
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $username): Response
    {
        $user = $this->userRepository->firstWhere('username', $username);

        $medias = $user->getLikedItems(Media::class)->paginate(10);

        return Inertia::render('User/LikedMedias', [
            'user' => $user,
            'medias' => $medias,
        ]);
    }
}