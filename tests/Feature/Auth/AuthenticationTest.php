<?php

use App\Models\User;
use App\Providers\RouteServiceProvider;

it('can be render login page', function () {
    $response = $this->get(route('login'));

    $response->assertStatus(200);
});

it('can authenticate using the login screen with his username', function () {
    $user = User::factory()->create();

    $response = $this->post('/connexion', [
        'username' => $user->username,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::LIBRARY);
});

it('can authenticate using the login screen with his email', function () {
    $user = User::factory()->create();

    $response = $this->post('/connexion', [
        'username' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::LIBRARY);
});

it('can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post('/connexion', [
        'username' => $user->username,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

it('can not authenticate with invalid password with his email', function () {
    $user = User::factory()->create();

    $this->post('/connexion', [
        'username' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

it('can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/deconnexion');

    $this->assertGuest();
    $response->assertRedirect('/');
});
