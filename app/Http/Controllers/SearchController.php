<?php

declare(strict_types=1);

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
        $perPage = 6;

        $result = null;
        if ($query && $type) {
            switch ($type) {
                case 'users':
                    $result = User::search(trim($query))->paginate($perPage);
                    break;
                case 'medias':
                    $result = Media::search(trim($query))
                        ->where('approved', true)
                        ->query(function ($query) {
                            $query
                                ->join('taggables as ta', 'medias.id', 'ta.taggable_id')
                                ->join('tags as t', 't.id', 'ta.tag_id')
                                ->select(['medias.*'])
                                ->distinct()
                                ->orderBy('medias.id', 'DESC');
                        })->paginate($perPage);
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
