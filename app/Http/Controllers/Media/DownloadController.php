<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Enums\PointType;
use App\Facades\PointFacade as Point;
use App\Http\Controllers\Controller;
use App\Models\MediaDownload;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DownloadController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, int $id): StreamedResponse
    {
        $media = $this->mediaRepository->find($id);
        $media->download_count += 1;
        $media->update();

        MediaDownload::create([
            'media_id' => $media->id,
            'ip_address' => $request->ip(),
            'user_id' => $request->user()?->id,
        ]);

        Point::reward($media->id, PointType::MEDIA_DOWNLOADED);

        return Storage::download($media->path);
    }
}
