<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Models\User;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected MediaRepository $mediaRepository,
        protected TagRepository $tagRepository,
        protected UserRepository $userRepository,
    ) {
    }

    public function __invoke(): Response
    {
        $mediasByMonth = $this->mediaRepository->all()->countBy(function ($media) {
            return (int) Carbon::parse($media->getRawOriginal('created_at'))->format('m');
        })->sortKeys();
        $usersByMonth = $this->userRepository->all()->countBy(function ($user) {
            return Carbon::parse($user->getRawOriginal('created_at'))->format('M');
        })->all();
        $tagsByUtilisation = Tag::withCount('medias')->orderBy('medias_count')->get()->mapWithKeys(function (Tag $tag) {
            return [$tag->name => $tag->medias_count];
        })->all();

        return Inertia::render('Admin/Index', [
            'users' => User::all(),
            'medias' => $this->mediaRepository->all(),
            'tags' => $this->tagRepository->all(),
            'stats' => [
                'mediasByMonth' => $mediasByMonth,
                'usersByMonth' => $usersByMonth,
                'tagsByUtilisation' => $tagsByUtilisation,
            ],
        ]);
    }
}
