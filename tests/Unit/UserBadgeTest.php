<?php

use App\Models\Badge;
use App\Models\BadgeType;
use App\Models\Media;
use App\Models\User;

test('badge is not attached to user when not necessary', function() {
    $user = User::factory()->create();
    BadgeType::factory()->create(['name' => 'media']);
    Badge::factory()->create([
        'name' => 'Media badge',
        'condition' => 5
    ]);

    Media::factory()->create(['user_id' => $user->id, 'approved' => 1]);

    $userBadges = User::all()->first()->badges();
    expect($userBadges->count())->toBe(0);
});

test('badge is correctly attached to user', function() {
    $user = User::factory()->create();
    BadgeType::factory()->create(['name' => 'media']);
    $badge = Badge::factory()->create([
        'name' => 'Media badge',
        'condition' => '1'
    ]);

    Media::factory()->create(['user_id' => $user->id, 'approved' => 1]);

    $userBadges = User::all()->first()->badges();
    expect($userBadges->first()->id)->toBe($badge->id)
        ->and($userBadges->first()->name)->toBe('Media badge');
});

test('badge is not attached to user multiples times', function() {
    $user = User::factory()->create();
    BadgeType::factory()->create(['name' => 'media']);
    $badge = Badge::factory()->create([
        'name' => 'Media badge 1',
        'condition' => '1'
    ]);

    Media::factory(10)->create(['user_id' => $user->id, 'approved' => 1]);

    $userBadges = User::all()->first()->badges();
    expect($userBadges->count())->toBe(1);
});

test('badge is not attached to user when media is not approved', function() {
    $user = User::factory()->create();
    BadgeType::factory()->create(['name' => 'media']);
    Badge::factory()->create([
        'name' => 'Media badge',
        'condition' => 1
    ]);

    Media::factory()->create([
        'user_id' => $user->id,
        'approved' => 0
    ]);

    $userBadges = User::all()->first()->badges();
    expect($userBadges->count())->toBe(0);
});

test('badge attached to user is not interfering with other type', function() {
    $user = User::factory()->create();

    // Badge : type media (by number of medias published (1,5,10,100...))
    $mediaBadgeType = BadgeType::factory()->create(['name' => 'media']);
    // Badge : type seniority (by year (1,2,3,4...))
    $seniorityBadgeType = BadgeType::factory()->create(['name' => 'seniority']);

    // 1 published media
    $mediaBadge = Badge::factory()->create([
        'name' => 'Badge 1 is media',
        'condition' => '1',
        'badge_type_id' => $mediaBadgeType->id
    ]);
    // Register since 1 year
    $seniorityBadge = Badge::factory()->create([
        'name' => 'Badge 1 is seniority',
        'condition' => '1',
        'badge_type_id' => $seniorityBadgeType->id
    ]);

    Media::factory(5)->create(['user_id' => $user->id, 'approved' => 1]);

    $userBadges = User::all()->first()->badges();
    expect($userBadges->first()->id)->toBe($mediaBadge->id)
        ->and($userBadges->first()->name)->toBe('Badge 1 is media')
        ->and($userBadges->first()->badge_type_id)->toBe($mediaBadge->id)
        ->and($userBadges->count())->toBeOne();
});

test('badge is correctly attached to the user when he has been registered for a certain amount of time.',
    function() {
        $user = User::factory()->create([
            'created_at' => now()->addYear()
        ]);

        BadgeType::factory()->create(['name' => 'seniority']);
        Badge::factory()->create([
            'name' => 'Seniority badge',
            'condition' => 1,
        ]);

        $userBadges = User::all()->first()->badges();
        expect($userBadges->count())->toBe(0);
    }
);
