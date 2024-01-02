<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository,
        public TagRepository $tagRepository
    ) {
    }

    public function __invoke(): Response
    {
        return Inertia::render('Admin/Index', [
            'users' => User::all(),
            'medias' => $this->mediaRepository->all(),
            'tags' => $this->tagRepository->all(),
        ]);
    }
}
