<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
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
            'username' => 'Test User',
            'email' => 'test@example.com',
//            'avatar' => $image = UploadedFile::fake()->image('avatar.png'),
//            'description' => 'Test'
        ]);

//    Storage::disk('public')->assertExists('avatar/'.$image->hashName());
    $response->assertSessionHasNoErrors();

    $user->refresh();

    expect('Test User')->toBe($user->username)
        ->and('test@example.com')->toBe($user->email)
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
