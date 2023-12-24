<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BadgeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $username): Response
    {
        $user = User::with('badges', 'medias', 'followers', 'followings')
            ->where('username', $username)
            ->first();
        // TODO: refactoriser ce fichier
        $medias = $this->mediaRepository->paginateByUser($user->id);

        return Inertia::render('User/Badges', [
            'user' => $user,
            'medias' => $medias,
        ]);
    }
}
