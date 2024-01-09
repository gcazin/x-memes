<?php

use App\Events\MediaApproved;
use App\Events\MediaDestroyed;
use App\Models\Media;
use App\Models\Tag;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\actingAs;

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
        ->get(RouteServiceProvider::LIBRARY)
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
    Storage::disk('public')->assertExists('medias/'.$image->hashName());
    $media->attachTags(['tag1', 'tag2']);

    expect($response->status())->toBe(200)
        ->and($media->tags()->pluck('name')->toArray())->toBe(['tag1', 'tag2']);
});

/*it('should store  video media and create thumbnail', function () {
    User::factory()->create();
    Storage::fake('medias');

    $response = actingAsGuest()->post(route('media.store'), [
        'name' => 'Test Media',
        'media_id' => $image = UploadedFile::fake()->image('test.mp4'),
        'extension' => 'mp4',
        'type' => 'video',
    ]);

    $media = Media::first();
    Storage::disk('medias')
        ->assertExists('medias/'.$image->hashName());


    $thumbnailName = 'thumbnails/'.explode('.', $image->hashName())[0].'.jpg';
    Storage::disk('medias')
        ->assertExists('medias/'.$thumbnailName);

    expect($response->status())->toBe(200);
});*/

it('should approve media and send notification', function () {
    Event::fake();
    Notification::fake();
    User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'approved' => 0,
    ]);

    actingAsSuperAdmin()->put(route('admin.media.approve', $media->id));

    $media = $media->refresh();

    Event::assertDispatched(MediaApproved::class);

    expect($media->approved)->toBe(true);
});

it('should download media and increment download count', function () {
    User::factory()->create();
    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'download_count' => 0,
    ]);

    actingAsGuest()->get(route('media.download', $media->id));

    expect($media->refresh()->download_count)->toBe(1);
});

test('a user can delete media that belong to him', function () {
    Event::fake();
    Notification::fake();

    $user = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    $response = actingAs($user)->delete(route('media.destroy', $media->id));

    Event::assertDispatched(MediaDestroyed::class);

    expect(Media::all()->count())->toBe(0)
        ->and($response->status())->toBe(200);
});

test('a user cannot delete media that does not belong to him', function () {
    Notification::fake();
    Event::fake();

    $user = User::factory()->create();
    $impostor = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    $response = actingAs($impostor)->delete(route('media.destroy', $media->id));

    Event::assertNotDispatched(MediaDestroyed::class);

    expect($response->status())->toBe(403)
        ->and($response->statusText())->toBe('Forbidden');
});

test('a super-administrator or administrator can delete media that does not belong to them', function () {
    Notification::fake();
    Event::fake();
    $user = User::factory()->create();

    Media::factory(2)->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    $asSuperAdmin = actingAsSuperAdmin()->delete(route('media.destroy', 1));
    $asAdmin = actingAsAdmin()->delete(route('media.destroy', 2));

    expect(Media::all()->count())->toBe(0)
        ->and($asSuperAdmin->status())->toBe(200)
        ->and($asAdmin->status())->toBe(200);
});

it('should delete media and not remove tags if used', function () {
    $user = User::factory()->create();

    $firstMedia = Media::factory()->create([
        'user_id' => 1,
        'path' => 'medias/'.Str::random().'.jpg',
    ])->attachTags(['foo', 'bar']);
    $secondMedia = Media::factory()->create([
        'user_id' => 1,
        'path' => 'medias/'.Str::random().'.jpg',
    ])->attachTags(['foo', 'bar']);

    actingAs($user)->delete(route('media.destroy', $firstMedia->id));

    expect($secondMedia->tags()->count())->toBe(2)
        ->and(Media::all()->count())->toBe(1);
});

it('should delete media and remove only tags not used', function () {
    $user = User::factory()->create();

    // 3 tags : foo, bar, baz
    // only baz should be deleted
    $firstMedia = Media::factory()->create([
        'name' => 'deleted',
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => 1,
    ])->attachTags(['foo', 'baz']);

    $secondMedia = Media::factory()->create([
        'name' => 'keep-tags',
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => 1,
    ])->attachTags(['foo', 'bar']);

    expect(Tag::all()->count())->toBe(3);

    actingAs($user)->delete(route('media.destroy', $firstMedia->id));

    expect($secondMedia->tags()->count())->toBe(2)
        ->and(Tag::all()->pluck('name')->all())->toBe(['foo', 'bar'])
        ->and(Media::all()->count())->toBe(1)
        ->and(Tag::all()->count())->toBe(2);
});

it('should delete media and remove tags if not used', function () {
    $user = User::factory()->create();

    $firstMedia = Media::factory()->create(['user_id' => 1])->attachTags(['foo', 'bar']);

    actingAs($user)->delete(route('media.destroy', $firstMedia->id));

    expect(Tag::all()->count())->toBe(0)
        ->and(Media::all()->count())->toBe(0);
});
