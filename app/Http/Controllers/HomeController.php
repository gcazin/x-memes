<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        if (auth()->user()) {
            return redirect()->to(RouteServiceProvider::LIBRARY);
        }

        return Inertia::render('Home');
    }

    public function leaderboard(): Response
    {
        $leaderboard = User::withCount('medias')->take(23)->groupBy('id')->orderByDesc('medias_count')->get();

        seoDescription(
            'Prend part au classement des meilleurs contributeurs sur X-Memes !
            Tu auras peut-être la chance de décrocher des badges exclusifs.'
        );

        return Inertia::render('Leaderboard', [
            'leaderboard' => $leaderboard,
        ]);
    }
}
