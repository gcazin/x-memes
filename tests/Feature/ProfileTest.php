<?php

use App\Models\User;
use Illuminate\Support\Facades\Storage;

test('profile page is displayed', function () {
    $response = actingAsGuest()->get(route('profile.edit'));

    expect($response->status())->toBe(200);
});

test('profile information can be updated', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->put(route('profile.update'), [
            'email' => 'test@example.com',
        ]);

    $response->assertSessionHasNoErrors();

    $user->refresh();

    expect('test@example.com')->toBe($user->email)
        ->and($user->email_verified_at)->toBeNull();
});

test('email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->put(route('profile.update'), [
            'username' => 'Test User',
            'email' => $user->email,
        ]);

    $response
        ->assertSessionHasNoErrors();

    expect($response->status())->toBe(200);
    $this->assertNotNull($user->refresh()->email_verified_at);
});

test('user can delete their account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->delete(route('profile.destroy'), [
            'password' => 'password',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('index'));

    $this->assertGuest();
    $this->assertNull($user->fresh());
});

test('correct password must be provided to delete account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from(route('profile.edit'))
        ->delete(route('profile.destroy'), [
            'password' => 'wrong-password',
        ]);

    $response
        ->assertSessionHasErrors('password')
        ->assertRedirect(route('profile.edit'));

    $this->assertNotNull($user->fresh());
});
