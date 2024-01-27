<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Repositories\MediaRepository;
use App\Services\FileService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DuplicateController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository,
        public FileService $fileService
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $imageHash = $this->fileService->hashImage($request->file('media_id'));

        $similaryMedia = $this->mediaRepository->firstWhere('hash', $imageHash);

        if ($similaryMedia) {
            return back()->with('duplicatedImage', $similaryMedia->path);
        }

        return back()->with('duplicatedImage');
    }
}
