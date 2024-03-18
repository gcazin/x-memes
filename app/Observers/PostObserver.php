<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Str;

class PostObserver
{
    public function created(Post $post): void
    {
        $post = Post::find($post->id);

        $post->update([
            'slug' => Str::slug($post->title),
        ]);
    }
}
