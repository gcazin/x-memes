<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Facades\SeoFacade;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\SchemaOrg\Schema;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::published()->paginate();

        return Inertia::render('Post/Index', [
            'posts' => $posts
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::published()->where('slug', $slug)->firstOrFail();

        $schema = Schema::article()
            ->name($post->title)
            ->datePublished($post->created_at)
            ->author(Schema::person()
                ->name($post->user->username)
            );

        SeoFacade::title($post->title)
            ->schema($schema->toScript())
            ->share();

        return Inertia::render('Post/Show', [
            'post' => $post
        ]);
    }
}
