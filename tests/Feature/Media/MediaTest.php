<?php

use App\Events\MediaApproved;
use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Listeners\Media\SendMediaApprovedMail;
use App\Listeners\Media\SendMediaApprovedNotification;
use App\Listeners\Media\SendMediaDeletedMail;
use App\Listeners\Media\SendMediaDeletedNotification;
use App\Listeners\Media\SendMediaPublishedMail;
use App\Listeners\Media\SendMediaPublishedNotification;
use App\Models\Media;
use App\Models\Tag;
use App\Models\User;
use Database\Seeders\PointTypeSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\actingAs;

it('should index approved medias', function () {
    $user = User::factory()->create();
    $this->seed('PointTypeSeeder');

    Media::factory()->create([
        'name' => 'Approved media',
        'user_id' => $user,
        'approved' => 1,
    ]);
    Media::factory()->create([
        'name' => 'Pending media',
        'user_id' => $user,
    ]);

    $response = actingAsGuest()
        ->get(route('library'))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Library', fn (AssertableInertia $page) => $page
                ->component('MediaGallery')
            )
        );
});

it('can see media', function () {
    $this->seed(PointTypeSeeder::class);
    User::factory()->create();
    $media = Media::factory()->create(['approved' => 1]);

    $response = actingAsGuest()
        ->get(route('media.show', $media->slug));

    expect($response->status())->toBe(200);
});

it('cannot see media if not approved', function () {
    $this->seed(PointTypeSeeder::class);
    User::factory()->create();
    $media = Media::factory()->create([
        'approved' => 0,
    ]);

    $response = actingAsGuest()
        ->get(route('media.show', $media->slug));

    expect($response->status())->toBe(404);
});

it('should store media and attach tags', function () {
    User::factory()->create();

    $response = actingAsGuest()->post(route('media.store'), [
        'name' => 'Test Media',
        'media_id' => $image = UploadedFile::fake()->image('test.jpg'),
        'tags' => ['TAG1', 'TAG2'],
    ]);

    $media = Media::first();
    Storage::disk('public')->assertExists('medias/'.$image->hashName());

    expect($response->status())->toBe(200)
        ->and($media->tags()->pluck('name')->toArray())->toBe(['tag1', 'tag2']);
});

it('should send mail and notification when an user post a media', function () {
    Event::fake();
    Mail::fake();

    $user = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    Event::assertListening(
        MediaPublished::class,
        SendMediaPublishedNotification::class
    );
    Event::assertListening(
        MediaPublished::class,
        SendMediaPublishedMail::class
    );
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

/*it('should approve media and send notification', function () {
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
    Event::assertListening(
        MediaApproved::class,
        SendMediaApprovedNotification::class
    );
    Event::assertListening(
        MediaApproved::class,
        SendMediaApprovedMail::class
    );

    expect($media->approved)->toBe(true);
});*/

it('should download media and increment download count', function () {
    User::factory()->create();
    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'download_count' => 0,
    ]);

    actingAsGuest()->get(route('media.download', $media->id));

    expect($media->refresh()->download_count)->toBe(1);
});

it("shouldn't send mail and notification when user delete his media", function () {
    Event::fake();

    $user = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    actingAs($user)->delete(route('media.destroy', $media->id));

    Event::assertNotDispatched(MediaDestroyed::class);
});

it('should send mail and notification when a super-administrator delete media', function () {
    Event::fake();

    $user = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    actingAsSuperAdmin()->delete(route('media.destroy', $media->id));

    Event::assertListening(
        MediaDestroyed::class,
        SendMediaDeletedMail::class
    );
    Event::assertListening(
        MediaDestroyed::class,
        SendMediaDeletedNotification::class
    );
});

it('should send mail and notification when an administrator delete media', function () {
    Event::fake();

    $user = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    actingAsAdmin()->delete(route('media.destroy', $media->id));

    Event::assertListening(
        MediaDestroyed::class,
        SendMediaDeletedMail::class
    );
    Event::assertListening(
        MediaDestroyed::class,
        SendMediaDeletedNotification::class
    );
});

it('can delete media that belong to him', function () {
    $user = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    $response = actingAs($user)->delete(route('media.destroy', $media->id));

    expect(Media::all()->count())->toBe(0);

    $response->assertRedirect(route('library'));
});

it('cannot delete media that does not belong to him', function () {
    $user = User::factory()->create();
    $impostor = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    $response = actingAs($impostor)->delete(route('media.destroy', $media->id));

    expect($response->status())->toBe(403)
        ->and($response->statusText())->toBe('Forbidden');
});

test('a super-administrator can delete media that does not belong to them', function () {
    $user = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    $response = actingAsSuperAdmin()->delete(route('media.destroy', $media->id));

    expect(Media::all()->count())->toBe(0);

    $response->assertRedirect(route('library'));
});

test('an administrator can delete media that does not belong to them', function () {
    $user = User::factory()->create();

    $media = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => $user->id,
    ]);

    $response = actingAsSuperAdmin()->delete(route('media.destroy', $media->id));

    expect(Media::all()->count())->toBe(0)
        ->and($response->status())->toBe(302);

    $response->assertRedirect(route('library'));
});

it('can delete media and not remove tags if used', function () {
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

it('can delete media and remove only tags not used', function () {
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

it('can delete media and remove tags if not used', function () {
    $user = User::factory()->create();

    $firstMedia = Media::factory()->create([
        'path' => 'medias/'.Str::random().'.jpg',
        'user_id' => 1,
    ])->attachTags(['foo', 'bar']);

    actingAs($user)->delete(route('media.destroy', $firstMedia->id));

    expect(Tag::all()->count())->toBe(0)
        ->and(Media::all()->count())->toBe(0);
});
