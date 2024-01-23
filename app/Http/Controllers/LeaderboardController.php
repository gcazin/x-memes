<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Point;
use App\Models\PointType;
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
        $leaderboard = User::with('point', 'followers')->orderByDesc(
            Point::select('amount')
                ->whereColumn('user_id', 'users.id')
                ->orderByDesc('amount')
        )->paginate(10);

        $pointTypes = PointType::all()->map->only(['description', 'amount']);

        seoDescription(
            'Prend part au classement des meilleurs contributeurs sur X-Memes !
            Tu auras peut-être la chance de décrocher des badges exclusifs.'
        );

        return Inertia::render('Leaderboard', [
            'leaderboard' => $leaderboard,
            'pointTypes' => $pointTypes,
        ]);
    }
}
