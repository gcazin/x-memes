<?php

use App\Models\Badge;
use App\Models\BadgeType;
use App\Models\Media;
use App\Models\Role;
use App\Models\User;

test('cannot have the badge when not needed', function () {
    $user = User::factory()->create();
    BadgeType::factory()->create(['name' => 'media']);
    Badge::factory()->create([
        'name' => 'Media badge',
        'condition' => 5,
    ]);

    Media::factory()->create(['user_id' => $user->id, 'approved' => 1]);

    expect($user->refresh()->badges()->count())->toBe(0);
});

test('can correctly attach the badge to the user', function () {
    $user = User::factory()->create();
    BadgeType::factory()->create(['name' => 'media']);
    $badge = Badge::factory()->create([
        'name' => 'Media badge',
        'condition' => '1',
    ]);

    Media::factory()->create(['user_id' => $user->id, 'approved' => 1]);

    $userBadges = $user->refresh()->badges();
    expect($userBadges->first()->id)->toBe($badge->id)
        ->and($userBadges->first()->name)->toBe('Media badge');
});

test('cannot attach the badge to the user more than once', function () {
    $user = User::factory()->create();

    BadgeType::factory()->create(['name' => 'media']);
    Badge::factory()->create([
        'name' => 'Media badge 1',
        'condition' => '1',
    ]);

    Media::factory(10)->create(['user_id' => $user->id, 'approved' => 1]);

    expect($user->refresh()->badges()->count())->toBe(1);
});

test('cannot attach badge if media not approved', function () {
    $user = User::factory()->create();

    BadgeType::factory()->create(['name' => 'media']);
    Badge::factory()->create([
        'name' => 'Media badge',
        'condition' => 1,
    ]);

    Media::factory()->create([
        'user_id' => $user->id,
        'approved' => 0,
    ]);

    $userBadges = $user->refresh()->badges();
    expect($userBadges->count())->toBe(0);
});

/*test('badge role is correctly attached to user', function () {
    $user = User::factory()->create();

    // Badge : type media (by number of medias published (1,5,10,100...))
    $mediaBadgeType = BadgeType::factory()->create(['name' => 'role']);
    // Badge : type seniority (by year (1,2,3,4...))
    $seniorityBadgeType = BadgeType::factory()->create(['name' => 'super-admin']);

    // 1 published media
    $mediaBadge = Badge::factory()->create([
        'name' => 'Badge 1 is media',
        'condition' => '1',
        'badge_type_id' => $mediaBadgeType->id,
    ]);

    Role::create(['name' => 'super-admin']);

    User::factory()->create()->assignRole('super-admin');

    $userBadges = $user->refresh()->badges();
    expect($userBadges->first()->id)->toBe($mediaBadge->id)
        ->and($userBadges->first()->name)->toBe('Badge 1 is media')
        ->and($userBadges->first()->badge_type_id)->toBe($mediaBadge->id)
        ->and($userBadges->count())->toBeOne();
});*/

test('cannot interfere with other badges of the same type', function () {
    $user = User::factory()->create();

    // Badge : type media (by number of medias published (1,5,10,100...))
    $mediaBadgeType = BadgeType::factory()->create(['name' => 'media']);
    // Badge : type seniority (by year (1,2,3,4...))
    $seniorityBadgeType = BadgeType::factory()->create(['name' => 'seniority']);

    // 1 published media
    $mediaBadge = Badge::factory()->create([
        'name' => 'Badge 1 is media',
        'condition' => '1',
        'badge_type_id' => $mediaBadgeType->id,
    ]);
    // Register since 1 year
    $seniorityBadge = Badge::factory()->create([
        'name' => 'Badge 1 is seniority',
        'condition' => '1',
        'badge_type_id' => $seniorityBadgeType->id,
    ]);

    Media::factory(5)->create(['user_id' => $user->id, 'approved' => 1]);

    $userBadges = $user->refresh()->badges();
    expect($userBadges->first()->id)->toBe($mediaBadge->id)
        ->and($userBadges->first()->name)->toBe('Badge 1 is media')
        ->and($userBadges->first()->badge_type_id)->toBe($mediaBadge->id)
        ->and($userBadges->count())->toBeOne();
});

test('can have a badge when registered for a certain period of time',
    function () {
        $user = User::factory()->create([
            'created_at' => now()->addYear(),
        ]);

        BadgeType::factory()->create(['name' => 'seniority']);
        Badge::factory()->create([
            'name' => 'Seniority badge',
            'condition' => 1,
        ]);

        $userBadges = $user->refresh()->badges();
        expect($userBadges->count())->toBe(0);
    }
);
