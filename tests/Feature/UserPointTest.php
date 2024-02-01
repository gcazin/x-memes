<?php

use App\Filament\Resources\MediaResource\Pages\ListMedia;
use App\Models\Media;
use App\Models\PointType;
use App\Models\User;
use Database\Seeders\PointTypeSeeder;
use Illuminate\Http\UploadedFile;

use function Pest\Laravel\actingAs;
use function Pest\Livewire\livewire;

beforeEach(function () {
    $this->seed(PointTypeSeeder::class);
});

it('can get reward when he visits media page', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create(['approved' => true]);

    actingAs($user)->get(route('media.show', $media->slug))->assertStatus(200);

    $point = $user->point()->first();

    expect($point->amount)->toBe(PointType::firstWhere('name', 'media_seen')->amount)
        ->and($media->points()->first()->pointable_id)->toBe($media->id)
        ->and($media->points()->first()->user_id)->toBe($user->id)
        ->and($media->points()->count())->toBe(1)
        ->and($user->points()->count())->toBe(0);
});

it('can get reward when he downloads media', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create();

    actingAs($user)->get(route('media.download', $media->id));

    $point = $user->point()->first();

    expect($point->amount)->toBe(PointType::firstWhere('name', 'media_downloaded')->amount)
        ->and($media->points()->first()->pointable_id)->toBe($media->id)
        ->and($media->points()->first()->user_id)->toBe($user->id)
        ->and($media->points()->count())->toBe(1)
        ->and($user->points()->count())->toBe(0);
});

it('can get reward when a user like his media', function () {
    $liked = User::factory()->create();
    $liker = User::factory()->create();

    $media = Media::factory()->create([
        'user_id' => $liked->id,
    ]);

    actingAs($liker)->get(route('media.like', $media->id));
    $point = $liked->point()->first();

    expect($point->amount)->toBe(PointType::firstWhere('name', 'user_liked_media')->amount)
        ->and($liked->points()->count())->toBe(1)
        ->and($liker->points()->count())->toBe(0);
});

it('can get reward when his media is approved', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create([
        'approved' => false,
    ]);

    actingAs($user);
    livewire(ListMedia::class)
        ->assertCanSeeTableRecords(Media::all())
        ->assertTableActionEnabled('approved')
        ->callTableAction('approved', $media);

    $media = $media->refresh();
    $point = $user->point()->first();

    expect($media->approved)->toBeTrue()
        ->and($point->amount)->toBe(PointType::firstWhere('name', 'media_approved')->amount)
        ->and($media->points()->first()->pointable_id)->toBe($media->id)
        ->and($media->points()->first()->user_id)->toBe($user->id)
        ->and($media->points()->count())->toBe(1)
        ->and($user->points()->count())->toBe(0);
});

it('can get reward when a user follow him', function () {
    $follower = User::factory()->create([
        'username' => 'follower',
    ]);
    $followable = User::factory()->create([
        'username' => 'followable',
    ]);

    actingAs($follower)->post(route('user.follow', $followable->id));
    $point = $followable->point()->first();

    expect($followable->followers->count())->toBe(1)
        ->and($follower->followings->count())->toBe(1)
        ->and($followable->points()->count())->toBe(1)
        ->and($point->amount)->toBe(PointType::firstWhere('name', 'user_following')->amount);
});

it('can get reward when a staff member follow him', function () {
    $followable = User::factory()->create([
        'username' => 'followable',
    ]);

    actingAsSuperAdmin()->post(route('user.follow', $followable->id));
    $point = $followable->point()->first();

    $amount = PointType::firstWhere('name', 'staff_user_following')->amount
        + PointType::firstWhere('name', 'user_following')->amount;

    expect($followable->followers->count())->toBe(1)
        ->and($followable->points()->count())->toBe(2)
        ->and($point->amount)->toBe($amount);
});

it('can get reward when daily login', function () {
    $user = User::factory()->create();

    actingAs($user)->get(route('library.image'));
    $point = $user->point()->first();

    expect($point->amount)->toBe(PointType::firstWhere('name', 'daily_login')->amount);
});

it('can is only rewarded on the first login', function () {
    $user = User::factory()->create();

    actingAs($user)->get(route('library.image'));
    actingAs($user)->get(route('library.image'));
    $point = $user->point()->first();

    expect($point->amount)->not->toBe(PointType::firstWhere('name', 'daily_login')->amount * 2);
});

it('can be rewarded when he registers', function () {
    $response = $this->post(route('register'), [
        'username' => 'test-user',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();

    $user = User::find(1);
    $point = $user->point()->first();

    expect($point->amount)->toBe(PointType::firstWhere('name', 'registered')->amount);
});

it('can have the correct number of points', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create([
        'approved' => false,
    ]);

    actingAs($user);
    livewire(ListMedia::class)
        ->assertCanSeeTableRecords(Media::all())
        ->assertTableActionEnabled('approved')
        ->callTableAction('approved', $media);
    $this->get(route('media.download', $media->id));

    $media = $media->refresh();
    $point = $user->point()->first();

    $amount = PointType::firstWhere('name', 'media_approved')->amount +
        PointType::firstWhere('name', 'media_downloaded')->amount;

    expect($point->amount)->toBe($amount)
        ->and($media->points()->first()->pointable_id)->toBe($media->id)
        ->and($media->points()->first()->user_id)->toBe($user->id)
        ->and($media->points()->count())->toBe(2);
});

test('super-admin|admin receives a reward when his media is approved', function () {
    actingAsSuperAdmin()->post(route('media.store'), [
        'name' => 'Test Media',
        'media_id' => UploadedFile::fake()->image('test.jpg'),
    ]);

    $media = Media::first();
    $user = User::first();
    $point = $user->point()->first();

    expect($media->approved)->toBeTrue()
        ->and($point->amount)->toBe(PointType::firstWhere('name', 'media_approved')->amount)
        ->and($media->points()->first()->pointable_id)->toBe($media->id)
        ->and($media->points()->first()->user_id)->toBe($user->id)
        ->and($media->points()->count())->toBe(1)
        ->and($user->points()->count())->toBe(0);
});

it('cannot get reward when he downloads media multiple times', function () {
    $user = User::factory()->create();
    $media = Media::factory()->create();

    actingAs($user)->get(route('media.download', $media->id));
    actingAs($user)->get(route('media.download', $media->id));

    $point = $user->point()->first();

    expect($point->amount)->not->toBe(PointType::firstWhere('name', 'media_downloaded')->amount * 2)
        ->and($point->amount)->toBe(PointType::firstWhere('name', 'media_downloaded')->amount)
        ->and($media->points()->count())->toBe(1);
});

test('artisan command deliver correct reward', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();

    // Not approved
    actingAs($user1)->post(route('media.store'), [
        'name' => 'Test Media',
        'media_id' => UploadedFile::fake()->image('test.jpg'),
        'user_id' => $user1->id,
        'approved' => false,
    ]);

    $media = Media::first();
    actingAs($user1)->get(route('media.download', $media->id));

    $this->artisan('user:reward');

    $point = $user1->point()->first();
    $amount = PointType::firstWhere('name', 'registered')->amount +
        PointType::firstWhere('name', 'media_downloaded')->amount;

    expect($point->amount)->toBe($amount)
        ->and($user2->point()->first()->amount)->toBe(PointType::firstWhere('name', 'registered')->amount);
});
