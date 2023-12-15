<?php

use App\Models\Media;
use App\Models\User;
use App\Repositories\MediaRepository;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;

// TODO: Faire les tests

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

    $mediasRepository = new MediaRepository(new Media());

    actingAsGuest()
        ->get(route('home'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Library', fn (AssertableInertia $page) => $page
                ->component('fdfsd')
            )
        );
});

it('should store media and attach tags', function () {
    Storage::fake();

    $file = 'test.jpg';
    Storage::disk('public')->put('media/'.$file, file_get_contents($file));

    $response = $this->post('/media', [
        'media_id' => $file,
        'name' => 'Test Media',
        'tags' => 'tag1, tag2',
    ]);

    expect($response->status())->toBe(302)
        ->and(Media::first()->tags)->toBe(['tag1', 'tag2']);
});

it('should approve media and send notification', function () {
    $user = User::factory()->create();

    $media = Media::factory()->create();

    actingAsSuperAdmin()->patch(route('admin.media.approve', $media->id))
        ->assertStatus(200);

    expect($media->approved)->toBe(true);
})->only();

it('should download media and increment download count', function () {
    $media = Media::factory()->create([
        'name' => 'Downloadable Media',
    ]);

    $response = $this->post('/media/download', [
        'id' => $media->id,
    ]);

    expect($response->status())->toBe(200)
        ->and($media->download_count)->toBe(1);
});

it('should destroy media and send notification', function () {
    $media = Media::factory()->create();

    $response = $this->post('/media/destroy', [
        'id' => $media->id,
    ]);

    expect($response->status())->toBe(302)
        ->and(Media::where('id', $media->id)->count())->toBe(0);

    // Assert notification sent
    $user = $media->user;
    $notification = Notification::where('user_id', $user->id)->first();
    expect($notification->type)->toBe('App\Notifications\Media\DeletedMediaNotification');
});
