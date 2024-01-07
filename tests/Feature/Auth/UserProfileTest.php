<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

use function Pest\Laravel\actingAs;

it('can update profile', function () {
    $user = User::factory()->create([
        'username' => 'old-username',
    ]);

    expect($user->username)->toBe('old-username')
        ->and($user->description)->toBe(null);

    $response = actingAs($user)->post(route('user.update'), [
        'username' => 'new-username',
        'description' => 'New description',
    ]);

    expect($user->refresh()->username)->toBe('new-username')
        ->and($user->refresh()->description)->toBe('New description');

    $response->assertRedirect(route('user.show', $user->refresh()->username));
});

it("can't update profile with wrong username", function () {
    $user = User::factory()->create([
        'username' => 'old-username',
    ]);

    $response = actingAs($user)->post(route('user.update'), [
        'username' => 'New username',
    ]);

    $response->assertSessionHasErrors(['username']);
});

it('can update avatar profile', function () {
    $user = User::factory()->create([
        'username' => 'old-username',
    ]);

    expect(Str::contains($user->avatar, 'avatar-placeholder'))->toBeTrue();

    $response = actingAs($user)->post(route('user.update'), [
        'username' => $user->username,
        'avatar' => $image = UploadedFile::fake()->image('avatar.jpg'),
    ]);

    expect($user->refresh()->avatar)->toBe('avatar/'.$image->hashName());

    $response->assertSessionDoesntHaveErrors();
});

it("can't update avatar profile with non-square image", function () {
    $user = User::factory()->create([
        'username' => 'old-username',
    ]);

    expect(Str::contains($user->avatar, 'avatar-placeholder'))->toBeTrue();

    $response = actingAs($user)->post(route('user.update'), [
        'username' => $user->username,
        'avatar' => UploadedFile::fake()->image('avatar.jpg', '100', '500'),
    ]);

    $response->assertSessionHasErrors(['avatar']);
});

it('can update avatar profile with square image', function () {
    $user = User::factory()->create([
        'username' => 'old-username',
    ]);

    expect(Str::contains($user->avatar, 'avatar-placeholder'))->toBeTrue();

    $response = actingAs($user)->post(route('user.update'), [
        'username' => $user->username,
        'avatar' => $image = UploadedFile::fake()->image('avatar.jpg', '500', '500'),
    ]);

    expect($user->refresh()->avatar)->toBe('avatar/'.$image->hashName());

    $response->assertSessionDoesntHaveErrors();
});
