<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Facades\SeoFacade as Seo;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CollectionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $tags = Tag::with('medias')
            ->whereHas('medias')
            ->whereLocale('name', app()->getLocale())
            ->get()
            ->sortBy('name')
            ->map(fn ($sql) => $sql->setRelation('medias', $sql->medias->random()))
            ->values();

        Seo::title('Collections')
            ->share();

        return Inertia::render('Collection', [
            'tags' => $tags,
        ]);
    }
}
