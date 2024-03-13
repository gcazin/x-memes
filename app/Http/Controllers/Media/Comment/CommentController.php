<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Media\StoreCommentRequest;
use App\Http\Requests\Media\UpdateCommentRequest;
use App\Models\Comment;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request): void
    {
        Comment::create([
            'content' => $request->get('content'), // phpstorm treats $request->content as an error...
            'user_id' => $request->user()->id,
            'media_id' => $request->media_id,
            'parent_id' => $request->parent_id,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(UpdateCommentRequest $request): void
    {
        $comment = Comment::find($request->comment_id);

        $comment->update(['content' => $request->get('content')]);

        flash('success', 'Ton commentaire a bien été modifié !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): void
    {
        $comment = Comment::find($id);

        $this->authorize('delete', $comment);

        // Delete all replies associated with the original comment
        if ($comment->replies()->exists()) {
            $comment->replies()->delete();
        }

        $comment->delete();
    }
}
