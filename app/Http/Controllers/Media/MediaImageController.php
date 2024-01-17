<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaImageController extends Controller
{
    public function __construct(
        protected MediaService $mediaService
    ) {

    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        seoDescription('Retrouves tes images de mèmes favoris sur X-Memes !');

        dd(Media::all());
        return Inertia::render(
            'Library',
            $this->mediaService->byType($request, 'image')
        );
    }
}
