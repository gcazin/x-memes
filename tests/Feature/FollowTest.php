<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('can follow a user', function () {
    $follower = User::factory()->create();
    $followable = User::factory()->create();

    actingAs($follower)->post(route('user.follow', $followable->id));

    expect($followable->followers->count())->toBe(1)
        ->and($follower->followings->count())->toBe(1);
});

it('can unfollow a user', function () {
    $follower = User::factory()->create();
    $followable = User::factory()->create();

    actingAs($follower)->post(route('user.follow', $followable->id));

    expect($followable->refresh()->followers->count())->toBe(1);

    actingAs($follower)->post(route('user.follow', $followable->id));

    expect($followable->refresh()->followers->count())->toBe(0);
});

it('cannot follow a user twice', function () {
    $follower = User::factory()->create();
    $followable = User::factory()->create();

    // Follow
    actingAs($follower)->post(route('user.follow', $followable->id));
    // Unfollow
    actingAs($follower)->post(route('user.follow', $followable->id));
    // Follow
    actingAs($follower)->post(route('user.follow', $followable->id));

    expect($followable->refresh()->followers->count())->toBe(1);
});
