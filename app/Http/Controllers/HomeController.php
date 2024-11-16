<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Facades\SeoFacade as SEO;
use App\Models\Media;
use App\Models\MediaDownload;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\SchemaOrg\Schema;

class HomeController extends Controller
{
    public function __invoke(): Response|RedirectResponse
    {
        SEO::title('La plateforme référence des mèmes d\'Internet')
            ->description('Télécharge, commente, aime et publie des mèmes d\'Internet pour la communauté. Inscrivez-vous dès maintenant pour ne plus avoir à chercher des heures votre mème préféré!')
            ->schema(
                Schema::webSite()
                    ->name(config('app.name'))
                    ->url(config('app.url'))
                    ->potentialAction(
                        Schema::searchAction()
                            ->target(
                                Schema::entryPoint()
                                    ->urlTemplate(config('app.url').'/search?query={search_term_string}')
                            )
                            ->setProperty(
                                'query-input',
                                Schema::propertyValueSpecification()
                                    ->valueRequired(true)
                                    ->valueName('search_term_string')
                            )
                    )
                    ->toScript()
            )
            ->share();

        $users = User::latest()->take(3)->get(['id', 'avatar']);
        $totalUsers = ceil(User::all()->count() / 5) * 5;
        $totalDownloads = MediaDownload::all()->count();
        $posts = Post::published()->take(3)->latest()->get();
        $medias = Media::whereApproved(true)->take(3)->latest()->get();

        return Inertia::render('Home', [
            'users' => $users,
            'totalUsers' => $totalUsers,
            'totalDownloads' => $totalDownloads,
            'posts' => $posts,
            'medias' => $medias,
        ]);
    }
}
