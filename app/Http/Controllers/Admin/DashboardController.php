<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Tags\Tag;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Index', [
            'users' => User::all(),
            'medias' => Media::all(),
            'tags' => Tag::all(),
        ]);
    }

    public function medias()
    {
        return Inertia::render('Admin/Medias', [
            'users' => User::all(),
            'medias' => Media::all(),
        ]);
    }

    public function users()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::all(),
        ]);
    }
}
