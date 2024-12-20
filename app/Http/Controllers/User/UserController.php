<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Facades\SeoFacade as SEO;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Models\User;
use App\Repositories\MediaRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {}

    public function show(string $username): Response
    {
        $user = User::with(['medias', 'followers'])
            ->withCount('followings', 'medias')
            ->firstWhere('username', $username);

        Seo::title(__('Profil de :username', ['username' => $username]))
            ->description('Profil de '.$username.' sur X-Memes - '.$user->medias()->count().' mèmes publiés - '.$user->followers()->count().' abonnés')
            ->type('profile')
            ->share();

        return Inertia::render('User/Show', [
            'user' => $user,
            'medias' => $user?->medias()->paginate(),
        ]);
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $request->user()->fill($request->except('avatar'));

        if ($request->hasFile('avatar')) {
            $avatar = Storage::put('avatar', $request->file('avatar'));
            $request->user()->avatar = $avatar;
        }

        $request->user()->save();

        return to_route('user.show', $request->user()->username);
    }
}
