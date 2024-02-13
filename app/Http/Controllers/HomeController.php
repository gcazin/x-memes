<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Facades\SeoFacade as SEO;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\SchemaOrg\Schema;

class HomeController extends Controller
{
    public function __invoke(): Response|RedirectResponse
    {
        SEO::title('X-Memes - La plateforme référence des mèmes d\'Internet')
            ->description('Télécharge, commente, aime et publie des mèmes d\'Internet pour la communauté. Inscrivez-vous dès maintenant pour ne plus avoir à chercher des heures votre mème préféré!')
            ->schema(
                Schema::webSite()
                    ->name(config('app.name'))
                    ->url(config('app.url'))
                    ->potentialAction(
                        Schema::searchAction()
                            ->target(config('app.url').'/search?query={search_term_string}')
                            ->query(__('Rechercher un mème...'))
                    )
                    ->toScript()
            )
            ->share();

        return Inertia::render('Home');
    }
}
