<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Facades\SeoFacade as SEO;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\MediaRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\SchemaOrg\Schema;

class FollowerController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $username): Response
    {
        $user = User::with('followers')
            ->withCount('followings', 'medias')
            ->firstWhere('username', $username);

        $followers = $user->followers()
            ->paginate(10);

        $title = __('Abonnés de :username', ['username' => $username]);
        Seo::description($title)
            ->title($title)
            ->type('profile')
            ->schema(
                Schema::webPage()
                    ->name($title)
                    ->toScript()
            )
            ->share();

        return Inertia::render('User/Followers', [
            'user' => $user,
            'followers' => $followers
        ]);
    }
}
