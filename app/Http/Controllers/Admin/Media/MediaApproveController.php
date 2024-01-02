<?php

namespace App\Http\Controllers\Admin\Media;

use App\Events\MediaApproved;
use App\Http\Controllers\Controller;
use App\Services\MediaService;
use Illuminate\Http\Request;

class MediaApproveController extends Controller
{
    public function __construct(
        public MediaService $mediaService
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $id): void
    {
        $media = $this->mediaService->approve($id);

        MediaApproved::dispatch($media);
    }
}
