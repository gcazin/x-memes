<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository,
        public TagRepository $tagRepository
    ) {
    }

    public function index()
    {
        return Inertia::render('Admin/Index', [
            'users' => User::all(),
            'medias' => $this->mediaRepository->all(),
            'tags' => $this->tagRepository->all(),
        ]);
    }

    public function medias()
    {
        return Inertia::render('Admin/Medias', [
            'users' => User::all(),
            'medias' => $this->mediaRepository->all(),
        ]);
    }

    public function users()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::all(),
        ]);
    }
}
