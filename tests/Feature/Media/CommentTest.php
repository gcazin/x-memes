<?php

use App\Models\Media;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('can comment media', function () {
    User::factory()->create();
    $media = Media::factory()->create(['approved' => true]);

    $response = actingAsGuest()->post(route('media.comment.store', $media->id), [
        'content' => 'Un commentaire',
        'media_id' => $media->id,
    ]);

    expect($response->status())->toBe(200)
        ->and($media->comments()->count())->toBe(1);
});

it('can update media', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create(['approved' => true]);

    actingAs($user)->post(route('media.comment.store', $media->id), [
        'content' => 'john',
        'media_id' => $media->id,
    ]);

    $comment = $media->comments()->first();

    expect($comment->refresh()->content)->toBe('john');

    actingAs($user)->put(route('media.comment.update', $media->id), [
        'content' => 'doe',
        'comment_id' => $comment->id,
    ]);

    expect($comment->refresh()->content)->toBe('doe');
});

it('can delete comment', function () {
    $user = User::factory()->create();
    Media::factory()->create(['approved' => true])->comments()->create([
        'content' => 'Un commentaire',
        'user_id' => $user->id,
    ]);

    $media = Media::first();

    expect($media->comments()->count())->toBe(1);

    $comment = $media->comments()->first();

    $response = actingAs($user)->delete(route('media.comment.destroy', $comment->id));

    expect($response->status())->toBe(200)
        ->and($media->comments()->count())->toBe(0);
});

it('can add reply to a comment', function () {
    $user = User::factory()->create();
    Media::factory()->create(['approved' => true])->comments()->create([
        'content' => 'Un commentaire',
        'user_id' => $user->id,
    ]);

    $media = Media::first();

    $comment = $media->comments()->first();

    $response = actingAsGuest()->post(route('media.comment.store', $media->id), [
        'content' => 'Un commentaire de commentaire',
        'media_id' => $media->id,
        'parent_id' => $comment->id,
    ]);

    expect($response->status())->toBe(200)
        ->and($comment->replies()->count())->toBe(1);
});
