<?php

use App\Models\Badge;

test('badges page is displayed only for admin', function () {
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
    actingAsSuperAdmin()->post(route('admin.badge.create'), [
        'name' => 'Badge created',
        'description' => 'Badge description',
        'filename' => 'storage/badges/1.png',
        'condition' => 100,
    ]);

    $badge = Badge::first();

    expect($badge->name)->toBe('Badge created')
        ->and($badge->description)->toBe('Badge description')
        ->and($badge->condition)->toBe(100)
        ->and($badge->filename)->toBeNull();
});

it('should update an existing badge', function () {
    $response = Badge::factory()->create();

    $badge = Badge::first();
    $badge->name = 'Updated badge';
    $badge->update();

    expect($badge->name)->toBe('Updated badge');
});

it('should delete a badge', function () {
    $badge = Badge::factory()->create();

    $response = actingAsSuperAdmin()->delete(route('admin.badge.destroy', $badge->id));

    expect($response->status())->toBe(200)
        ->and(Badge::where('id', $badge->id)->count())->toBe(0);
});
