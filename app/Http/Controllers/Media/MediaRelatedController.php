<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Services\MediaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MediaRelatedController extends Controller
{
    public function __construct(
        public MediaService $mediaService
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $id): RedirectResponse
    {
        return $this->mediaService->related($id);
    }
}
