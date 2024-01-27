<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Enums\PointType;
use App\Facades\PointFacade;
use App\Http\Controllers\Controller;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;

class MediaLikeController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $id): void
    {
        $media = $this->mediaRepository->find($id);

        auth()->user()->toggleLike($media);

        PointFacade::setUser($media->user)->reward($media->id, PointType::USER_LIKED_MEDIA);
    }
}
