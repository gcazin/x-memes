<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Facades\SeoFacade;
use App\Http\Controllers\Controller;
use App\Models\Media;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    public function __invoke(string $name): Response
    {
        $medias = Media::withAllTags($name)
            ->where('lang', app()->getLocale())
            ->paginate();

        SeoFacade::title(__('Les meilleures mèmes ":tag" d\'Internet', ['tag' => $name]))
            ->description('Découvre les meilleures mèmes ":tag" d\'Internet à un seul et même endroit!')
            ->share();

        return Inertia::render('Media/Tag/Show', [
            'tag' => $name,
            'medias' => $medias,
        ]);
    }
}
