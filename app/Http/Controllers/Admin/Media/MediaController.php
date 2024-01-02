<?php

namespace App\Http\Controllers\Admin\Media;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\MediaRepository;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Medias', [
            'users' => User::all(),
            'medias' => $this->mediaRepository->all(),
        ]);
    }
}
