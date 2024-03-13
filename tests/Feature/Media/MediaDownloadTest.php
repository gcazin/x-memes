<?php

use App\Models\Media;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('can add statistic to media', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create();

    actingAs($user)
        ->get(route('media.download', $media->id));

    $statistic = $media->statistic();
    expect($statistic->count())->toBe(1)
        ->and($statistic->first()->user_id)->toBe($user->id)
        ->and($statistic->first()->ip_address)->not->toBeNull();
});

it('can remove statistic if media is deleted', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create();

    actingAs($user)
        ->get(route('media.download', $media->id));

    $statistic = $media->statistic();
    expect($statistic->count())->toBe(1)
        ->and($statistic->first()->user_id)->toBe($user->id)
        ->and($statistic->first()->ip_address)->not->toBeNull();

    actingAs($user)->delete(route('media.destroy', $media->id));

    expect(Media::all()->count())->toBe(0)
        ->and($media->statistic()->count())->toBe(0);
});

/*it('can remove statistic if user is deleted', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create();

    actingAs($user)->get(route('media.download', $media->id));

    $statistic = $media->statistic();

    expect($statistic->count())->toBe(1);

    $user->delete();

    expect($media->refresh()->statistic()->count())->toBe(0);
});*/
