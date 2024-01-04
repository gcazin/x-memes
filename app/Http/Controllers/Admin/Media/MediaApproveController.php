<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Media;

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
    public function __invoke(Request $request, int $id): void
    {
        flash('success', 'Le média a bien été approuvé.');

        $this->mediaService->approve($id);
    }
}
