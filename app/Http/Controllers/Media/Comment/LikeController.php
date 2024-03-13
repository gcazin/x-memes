<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media\Comment;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, int $id): void
    {
        $comment = Comment::find($id);

        auth()->user()->toggleLike($comment);
    }
}
