<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Waitlist;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // When is launched
        /*if (auth()->user()) {
            return redirect()->to(route('library'));
        }*/

        $waitlist = Waitlist::all()->take(10);

        return Inertia::render('Home', [
            'stage' => env('APP_STAGE'),
            'waitlist' => $waitlist,
        ]);
    }

    public function leaderboard()
    {
        $leaderboard = User::withCount('medias')->take(23)->groupBy('id')->orderByDesc('medias_count')->get();

        return Inertia::render('Leaderboard', [
            'leaderboard' => $leaderboard,
        ]);
    }
}
