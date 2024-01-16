<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $leaderboard = User::withCount('medias')->take(23)->groupBy('id')->orderByDesc('medias_count')->paginate(10);

        seoDescription(
            'Prend part au classement des meilleurs contributeurs sur X-Memes !
            Tu auras peut-être la chance de décrocher des badges exclusifs.'
        );

        return Inertia::render('Leaderboard', [
            'leaderboard' => $leaderboard,
        ]);
    }
}
