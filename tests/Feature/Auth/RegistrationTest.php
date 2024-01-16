<?php

use App\Mail\WelcomeMail;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Mail;

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
});

test('new users can register', function () {
    Mail::fake();

    $response = $this->post(route('register'), [
        'username' => 'test-user',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();

    Mail::assertQueued(WelcomeMail::class);
    Mail::assertQueuedCount(1);

    $user = User::find(1);
    expect($user)->not->toBe(null)
        ->and($user->username)->toBe('test-user');

    $response->assertRedirect(RouteServiceProvider::LIBRARY);
});

test("new users can't have the same username", function () {
    User::factory()->create(['username' => 'test-user']);

    $response = $this->post(route('register'), [
        'username' => 'test-user',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors(['username']);
});

test('new users has the username trimmed', function () {
    $response = $this->post(route('register'), [
        'username' => 'test-user',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $user = User::find(1);
    expect($user->username)->toBe('test-user')
        ->and($user->username)->not->toBe('test-user ');
    $response->assertSessionHasNoErrors();
});
