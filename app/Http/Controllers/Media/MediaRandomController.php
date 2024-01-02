<?php

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;

class MediaRandomController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if ($this->mediaRepository->allApprovedMedias()->count() !== 0) {
            return redirect(route('media.show', $this->mediaRepository->random()));
        }

        abort(404);
    }
}
