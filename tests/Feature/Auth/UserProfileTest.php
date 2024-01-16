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
        ->and($user->description)->toBe(null)
        ->and($user->x_username)->toBe(null)
        ->and($user->github_username)->toBe(null);

    $response = actingAs($user)->post(route('user.update'), [
        'username' => 'new-username',
        'description' => 'New description',
        'x_username' => 'john',
        'github_username' => 'john',
    ]);

    expect($user->refresh()->username)->toBe('new-username')
        ->and($user->refresh()->description)->toBe('New description')
        ->and($user->x_username)->toBe('john')
        ->and($user->github_username)->toBe('john');

    $response->assertRedirect(route('user.show', $user->refresh()->username));
});

it('can update username', function () {
    $user = User::factory()->create([
        'username' => 'foo',
    ]);

    expect($user->username)->toBe('foo');

    $response = actingAs($user)->post(route('user.update'), [
        'username' => 'bar',
    ]);

    expect($user->refresh()->username)->toBe('bar');

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

it('can update description', function () {
    $user = User::factory()->create();

    expect($user->description)->toBe(null);

    $response = actingAs($user)->post(route('user.update'), [
        'username' => $user->username,
        'description' => 'foo',
    ]);

    expect($user->refresh()->description)->toBe('foo');

    $response->assertRedirect(route('user.show', $user->refresh()->username));
});

it('can update X username', function () {
    $user = User::factory()->create();

    expect($user->x_username)->toBe(null);

    $response = actingAs($user)->post(route('user.update'), [
        'username' => $user->username,
        'x_username' => 'foo',
    ]);

    expect($user->refresh()->x_username)->toBe('foo');

    $response->assertRedirect(route('user.show', $user->refresh()->username));
});

it('can update Github username', function () {
    $user = User::factory()->create();

    expect($user->github_username)->toBe(null);

    $response = actingAs($user)->post(route('user.update'), [
        'username' => $user->username,
        'github_username' => 'foo',
    ]);

    expect($user->refresh()->github_username)->toBe('foo');

    $response->assertRedirect(route('user.show', $user->refresh()->username));
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
