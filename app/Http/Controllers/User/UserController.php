<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Models\User;
use App\Repositories\MediaRepository;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    public function show(string $username)
    {
        $user = User::with('badges', 'medias', 'followers', 'followings')
            ->where('username', $username)
            ->first();

        /*$filesystem = new Filesystem;
        $path = 'storage/'.$user->avatar;
        $name = $filesystem->name($path);
        $extension = $filesystem->extension($path);
        $originalName = $name . '.' . $extension;
        $mimeType = $filesystem->mimeType($path);

        $user->uploaded_avatar = new UploadedFile($path, $originalName, $mimeType);*/

        $medias = $this->mediaRepository->paginateByUser($user->id);

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
    }
}
