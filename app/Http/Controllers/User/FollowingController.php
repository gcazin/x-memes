<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Facades\SeoFacade as SEO;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\SchemaOrg\Schema;

class FollowingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $username): Response
    {
        $user = User::with('followings')
            ->withCount('followers', 'medias')
            ->firstWhere('username', $username);

        $followings = $user->followings()
            ->paginate(10)
            ->through(fn ($following) => $following->followable);

        $title = __('Abonnements de :username', ['username' => $username]);
        Seo::description($title)
            ->title($title)
            ->type('profile')
            ->schema(
                Schema::webPage()
                    ->name($title)
                    ->toScript()
            )
            ->share();

        return Inertia::render('User/Followings', [
            'user' => $user,
            'followings' => $followings,
        ]);
    }
}
