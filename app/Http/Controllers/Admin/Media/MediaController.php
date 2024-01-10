<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Media;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function __construct(
        protected MediaRepository $mediaRepository,
        protected TagRepository $tagRepository
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Medias', [
            'users' => User::all(),
            'medias' => $this->mediaRepository->allPendingMedias(),
            'tags' => $this->tagRepository->all(),
        ]);
    }
}
