<?php

use App\Models\Media;
use App\Models\User;
use App\Notifications\Media\ApprovedMediaNotification;
use App\Notifications\Media\DeletedMediaNotification;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;

it('should index approved medias', function () {
    $user = User::factory()->create();

    Media::factory()->create([
        'name' => 'Approved media',
        'user_id' => $user,
        'approved' => 1,
    ]);
    Media::factory()->create([
        'name' => 'Pending media',
        'user_id' => $user,
    ]);

    actingAsGuest()
        ->get(route('library'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Library', fn (AssertableInertia $page) => $page
                ->component('MediaGallery')
            )
        );
});

it('should store media and attach tags', function () {
    User::factory()->create();

    $response = actingAsGuest()->post(route('media.store'), [
        'name' => 'Test Media',
        'media_id' => $image = UploadedFile::fake()->image('test.jpg'),
    ]);

    $media = Media::first();
    Storage::disk('public')->assertExists('media/'.$image->hashName());
    $media->attachTags(['tag1', 'tag2']);

    expect($response->status())->toBe(200)
        ->and($media->tags()->pluck('name')->toArray())->toBe(['tag1', 'tag2']);
});

it('should approve media and send notification', function () {
    Notification::fake();
    User::factory()->create();

    $media = Media::factory()->create(['approved' => 0]);

    actingAsSuperAdmin()->put(route('admin.media.approve', $media->id));

    $media = $media->refresh();
    Notification::assertCount(1);
    Notification::assertSentTo(
        [$media->user], ApprovedMediaNotification::class
    );

    expect($media->approved)->toBe(true);
});

it('should download media and increment download count', function () {
    User::factory()->create();
    $media = Media::factory()->create();

    actingAsGuest()->get(route('media.download', $media->id));

    // TODO: check if session has data
    expect($media->refresh()->download_count)->toBe(1);
});

it('should destroy media and send notification', function () {
    Notification::fake();
    User::factory()->create();
    $media = Media::factory()->create();

    $response = actingAsGuest()->delete(route('media.destroy', $media->id));

    expect($response->status())->toBe(200)
        ->and(Media::where('id', $media->id)->count())->toBe(0);

    Notification::assertCount(1);
    Notification::assertSentTo([$media->user], DeletedMediaNotification::class);
});
