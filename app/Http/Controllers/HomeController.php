<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Facades\SeoFacade as SEO;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response|RedirectResponse
    {
        SEO::title('Accueil')
            ->description('test');

        return Inertia::render('Home');
    }
}
