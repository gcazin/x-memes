<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $query = $request->query('query');
        $type = $request->query('type');

        $result = null;
        if ($query && $type) {
            switch ($type) {
                case 'users':
                    $result = User::search($query)->get();
                    break;
                case 'medias':
                    $result = Media::search($query)->paginate(6);
                    break;
            }
        }

        return Inertia::render('Search', [
            'type' => $type,
            'query' => $query,
            'result' => $result,
        ]);
    }
}
