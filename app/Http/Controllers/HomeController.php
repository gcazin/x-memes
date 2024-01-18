<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Media;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response|RedirectResponse
    {
        dd(Media::with('user'));
        if (auth()->user()) {
            return redirect()->to(RouteServiceProvider::LIBRARY);
        }

        return Inertia::render('Home');
    }
}
