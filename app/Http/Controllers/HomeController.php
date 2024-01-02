<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Waitlist;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // When is launched
        /*if (auth()->user()) {
            return redirect()->to(route('library'));
        }*/

        $waitlist = Waitlist::all()->take(10);

        return Inertia::render('Home', [
            'stage' => config('app.stage'),
            'waitlist' => $waitlist,
        ]);
    }

    public function leaderboard(): Response
    {
        $leaderboard = User::withCount('medias')->take(23)->groupBy('id')->orderByDesc('medias_count')->get();

        return Inertia::render('Leaderboard', [
            'leaderboard' => $leaderboard,
        ]);
    }
}
