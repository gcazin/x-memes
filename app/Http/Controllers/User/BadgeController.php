<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Facades\SeoFacade as SEO;
use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\User;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\SchemaOrg\Schema;

class BadgeController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(string $username): Response
    {
        $user = User::with('followers', 'badges')
            ->withCount('followings', 'medias')
            ->firstWhere('username', $username);

        $medias = $this->mediaRepository->paginateByUser($user->id);

        $title = __('Badges de :username', ['username' => $username]);
        Seo::description($title)
            ->title($title)
            ->type('profile')
            ->schema(
                Schema::webPage()
                    ->name($title)
                    ->toScript()
            )
            ->share();

        return Inertia::render('User/Badges', [
            'user' => $user,
            'medias' => $medias,
            'badges' => Badge::all(),
        ]);
    }
}
