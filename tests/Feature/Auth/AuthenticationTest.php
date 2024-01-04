<?php

use App\Models\User;
use App\Providers\RouteServiceProvider;

test('login screen can be rendered', function () {
    $response = $this->get('/connexion');

    $response->assertStatus(200);
});

test('users can authenticate using the login screen with his username', function () {
    $user = User::factory()->create();

    $response = $this->post('/connexion', [
        'username' => $user->username,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::LIBRARY);
});

test('users can authenticate using the login screen with his email', function () {
    $user = User::factory()->create();

    $response = $this->post('/connexion', [
        'username' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::LIBRARY);
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post('/connexion', [
        'username' => $user->username,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can not authenticate with invalid password with his email', function () {
    $user = User::factory()->create();

    $this->post('/connexion', [
        'username' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/deconnexion');

    $this->assertGuest();
    $response->assertRedirect('/');
});
