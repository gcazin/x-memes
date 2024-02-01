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
        SEO::title('La réference des mèmes sur X (Twitter)')
            ->description('La plateforme qui te permet de retrouver tes mèmes préférés!')
            ->schema(
                Schema::webSite()
                    ->name(config('app.name'))
                    ->url(config('app.url'))
                    ->potentialAction(
                        Schema::searchAction()
                            ->target(config('app.url').'/rechercher?query={search_term_string}')
                    )
                    ->toScript()
            )
            ->share();

        return Inertia::render('Home');
    }
}
