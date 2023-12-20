<?php
/*
use App\Models\Waitlist;

beforeEach(function () {
    app()->detectEnvironment(function() {
        return 'production';
    });
});

test('waitlist page is displayed', function () {
    $response = actingAsGuest()->get(route('index'));

    expect($response->status())->toBe(200);
});

test('can register to waitlist', function () {
    $this->assertEquals('production', app()->environment());

    $response = $this->post(route('waitlist.store'), [
        'email' => 'example@example.fr'
    ]);

    expect(Waitlist::all()->count())->toBe(1)
        ->and($response->status())->toBe(200);
});

test('cannot register to waitlist with same email', function () {
    $email = 'example@example.fr';

    $first = $this->post(route('waitlist.store'), [
        'email' => $email
    ]);
    expect(Waitlist::all()->count())->toBe(1)
        ->and($first->status())->toBe(200);

    $second = $this->post(route('waitlist.store'), [
        'email' => $email
    ]);

    $second->assertSessionHasErrors();
});*/
