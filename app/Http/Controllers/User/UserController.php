<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Models\User;
use App\Repositories\MediaRepository;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    public function show(string $username): Response
    {
        $user = User::with('badges', 'medias', 'followers', 'followings')
            ->firstWhere('username', $username);

        $medias = null;
        if ($user) {
            $medias = $this->mediaRepository->paginateByUser($user->id);
        }

        return Inertia::render('User/Show', [
            'user' => $user,
            'medias' => $medias,
        ]);
    }

    public function update(UpdateProfileRequest $request)
    {
        $request->user()->fill($request->except('avatar'));

        if ($request->hasFile('avatar')) {
            if ($request->user()->getOriginal('avatar')) {
                Storage::delete($request->user()->getOriginal('avatar'));
            }
            $avatar = Storage::put('avatar', $request->file('avatar'));
            $request->user()->avatar = $avatar;
        }

        $request->user()->save();

        return redirect()->to(route('user.show', $request->user()->username));
    }
}
