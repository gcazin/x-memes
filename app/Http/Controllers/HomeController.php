<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        if (auth()->user()) {
            return redirect()->to(route('library'));
        }

        return Inertia::render('Home');
    }

    public function leaderboard(): Response
    {
        $leaderboard = User::withCount('medias')->take(23)->groupBy('id')->orderByDesc('medias_count')->get();

        return Inertia::render('Leaderboard', [
            'leaderboard' => $leaderboard,
        ]);
    }
}
