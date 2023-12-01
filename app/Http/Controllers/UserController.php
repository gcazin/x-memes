<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show(User $user, int $id)
    {
        $user = User::all()->find($id)->with('medias', 'badges')->first();
        return Inertia::render('User/Show', [
            'user' => $user,
        ]);
    }
}
