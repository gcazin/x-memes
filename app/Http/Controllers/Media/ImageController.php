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

class ImageController extends Controller
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
        seoDescription('Télécharge, commente, aime et publie des mèmes d\'Internet pour la communauté. Inscrivez-vous dès maintenant pour ne plus avoir à chercher des heures votre mème préféré!');

        if (auth()->user()) {
            PointFacade::reward(null, PointType::DAILY_LOGIN);
        }

        return Inertia::render(
            'Library',
            $this->mediaService->byType($request, 'image', 'Les meilleurs mèmes d\'Internet')
        );
    }
}
