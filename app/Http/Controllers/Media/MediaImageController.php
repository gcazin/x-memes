<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Enums\PointType;
use App\Facades\PointFacade;
use App\Http\Controllers\Controller;
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

        if (auth()->user()) {
            PointFacade::reward(null, PointType::DAILY_LOGIN);
        }

        return Inertia::render(
            'Library',
            $this->mediaService->byType($request, 'image')
        );
    }
}
