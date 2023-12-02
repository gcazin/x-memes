<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\Media;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Tags\Tag;

class DashboardController extends Controller
{
    public function index()
    {
        $users = User::all();
        $medias = Media::with('user')->get();
        $tags = Tag::all();
        return Inertia::render('Admin/Dashboard', [
            'users' => $users,
            'medias' => $medias,
            'tags' => $tags
        ]);
    }

    public function medias()
    {
        $users = User::all();
        $medias = Media::with('user')->get();
        return Inertia::render('Admin/Medias', [
            'users' => $users,
            'medias' => $medias
        ]);
    }

    public function users()
    {
        $users = User::with('roles')->get();
        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function tags()
    {
        $tags = Tag::all();
        return Inertia::render('Admin/Tags', [
            'tags' => $tags,
        ]);
    }

    public function badges()
    {
        $badges = Badge::with('users')->get();
        return Inertia::render('Admin/Badges', [
            'badges' => $badges
        ]);
    }
}
