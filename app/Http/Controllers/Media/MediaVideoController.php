<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaVideoController extends Controller
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
        seoDescription('Retrouves tes vidéos de mèmes favoris sur X-Memes !');

        return Inertia::render(
            'Library',
            $this->mediaService->byType($request, 'video', 'Bibliothèque de vidéos')
        );
    }
}
