<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show(int $id)
    {
        $user = User::with('medias', 'badges')->find($id);

        return Inertia::render('User/Show', [
            'user' => $user,
        ]);
    }
}
