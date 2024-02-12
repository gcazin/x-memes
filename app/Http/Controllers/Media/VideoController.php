<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
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
        seoDescription('Télécharge, commente, aime et publie des mèmes vidéos d\'Internet pour la communauté. Inscris-toi dès maintenant pour ne plus avoir à chercher des heures ton mème préféré!');

        return Inertia::render(
            'Library',
            $this->mediaService->byType($request, 'video', 'Les meilleurs mèmes vidéos d\'Internet')
        );
    }
}
