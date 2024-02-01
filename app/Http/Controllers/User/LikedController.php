<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Facades\SeoFacade as SEO;
use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LikedController extends Controller
{
    public function __construct(
        protected UserRepository $userRepository
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $username): Response
    {
        $user = User::with('followers')
            ->withCount('followings')
            ->firstWhere('username', $username);

        $medias = $user->getLikedItems(Media::class)->paginate(10);

        Seo::description('Découvre les publications de '.$username.' sur '.config('app.name'))
            ->title('Publications aimées de '.$username.' sur '.config('app.name'))
            ->type('profile')
            ->share();

        return Inertia::render('User/LikedMedias', [
            'user' => $user,
            'medias' => $medias,
        ]);
    }
}
