<?php

use App\Models\Badge;
use App\Models\BadgeType;
use App\Models\User;

test('badges page is displayed only for admin', function () {
    User::factory()->create();

    $superadmin = actingAsSuperAdmin()
        ->get(route('admin.badge.index'));
    $admin = actingAsAdmin()
        ->get(route('admin.badge.index'));
    $moderator = actingAsModerator()
        ->get(route('admin.badge.index'));
    $guest = actingAsGuest()
        ->get(route('admin.badge.index'));

    $superadmin->assertStatus(200);
    $admin->assertStatus(200);

    $moderator->assertStatus(403);
    $moderator->assertSeeText('Forbidden');

    $guest->assertStatus(403);
    $guest->assertSeeText('Forbidden');
});

it('can create a new badge', function () {
    User::factory()->create();

    $badgeType = BadgeType::factory()->create(['name' => 'media']);

    actingAsSuperAdmin()->post(route('admin.badge.store'), [
        'name' => 'Badge created',
        'description' => 'Badge description',
        'condition' => 100,
        'badge_type_id' => $badgeType->id
    ]);

    $badge = Badge::first();

    expect($badge->name)->toBe('Badge created')
        ->and($badge->description)->toBe('Badge description')
        ->and($badge->condition)->toBe("100")
        ->and($badge->path)->toBeNull();
});

it('should update an existing badge', function () {
    User::factory()->create();

    $badge = Badge::factory()->create([
        'name' => 'Badge name',
        'badge_type_id' => BadgeType::create(['name' => 'media'])
    ]);

    actingAsSuperAdmin()->patch(route('admin.badge.update', $badge->id), [
        'name' => 'Updated badge',
    ]);

    $badge = Badge::first();

    expect($badge->name)->toBe('Updated badge');
});

it('should delete a badge', function () {
    User::factory()->create();
    BadgeType::factory()->create();

    $badge = Badge::factory()->create();
    $response = actingAsSuperAdmin()->delete(route('admin.badge.destroy', $badge->id));

    expect($response->status())->toBe(200)
        ->and(Badge::where('id', $badge->id)->count())->toBe(0);
});
