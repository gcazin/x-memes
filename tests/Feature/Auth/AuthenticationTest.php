<?php

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

it('can be render login page', function () {
    $response = $this->get(route('login'));

    $response->assertStatus(200);
});

it('can authenticate using the login screen with his username', function () {
    $user = User::factory()->create();

    $response = $this->post(LaravelLocalization::localizeUrl('login'), [
        'username' => $user->username,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::LIBRARY);
});

it('can authenticate using username in uppercase', function () {
    $this->seed('PointTypeSeeder');

    $this->post(route('register'), [
        'username' => 'JOHNDOE',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $user = User::first();
    expect($user->username)->toBe('johndoe');

    $response = $this->post(route('login'), [
        'username' => 'JOHNDOE',
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::LIBRARY);
});

it('can authenticate using the login screen with his email', function () {
    $user = User::factory()->create();

    $response = $this->post(route('login'), [
        'username' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::LIBRARY);
});

it('can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post(route('login'), [
        'username' => $user->username,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

it('can not authenticate with invalid password with his email', function () {
    $user = User::factory()->create();

    $this->post(route('login'), [
        'username' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

it('can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $this->assertGuest();
    $response->assertRedirect('/');
});
