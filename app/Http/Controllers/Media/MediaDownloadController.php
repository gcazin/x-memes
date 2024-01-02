<?php

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Repositories\MediaRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaDownloadController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $id): RedirectResponse
    {
        $media = $this->mediaRepository->find($id);

        $media->download_count += 1;

        $media->update();

        return redirect()->back()->with('downloaded_file', base64_encode(Storage::get($media->path)));
    }
}
