<?php

// Default to en in test

it('not redirected when is already the good locale', function () {
    expect(app()->getLocale())->toBe('en');

    $response = $this->get(route('index'));

    expect($response->status())->toBe(200)
        ->and(app()->getLocale())->toBe('en');
});

it('can be redirected to the good locale', function () {
    expect(app()->getLocale())->toBe('en');

    $this->refreshApplicationWithLocale('fr');

    $response = $this->get(route('index'));

    expect($response->status())->toBe(302)
        ->and(app()->getLocale())->toBe('fr');
});
