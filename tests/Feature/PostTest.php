<?php

use App\Models\Post;
use App\Models\User;

it('can see posts index', function () {
    User::factory()->create();
    $response = actingAsGuest()->get(route('post.index'));

    expect($response->status())->toBe(200);
});

it('can see post', function () {
    User::factory()->create();
    $post = Post::factory()->create([
        'is_draft' => false,
    ]);

    $response = actingAsGuest()->get(route('post.show', $post->slug));

    expect($response->status())->toBe(200);
});

it('cannot see unpublished post', function () {
    User::factory()->create();
    $post = Post::factory()->create([
        'is_draft' => true,
    ]);

    $response = actingAsGuest()->get(route('post.show', $post->slug));

    expect($response->status())->toBe(404);
});
