<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function leaderboard()
    {
        $leaderboard = DB::table('medias')->join('users as u', 'u.id', '=', 'medias.user_id')
            ->select('u.*', DB::raw('count(*) as media_count'))
            ->groupBy('user_id')
            ->get();
        $users = User::all();
        $medias = Media::with('user')->get();
        return Inertia::render('Leaderboard', [
            'leaderboard' => $leaderboard,
            'users' => $users,
            'medias' => $medias
        ]);
    }
}
