<?php

test('just a test so that the editor assigns the right file icon type', function () {
    expect(config('app.name'))->toBe('X-Memes');
});

arch('debugging statements not used')
    ->expect(['dd', 'dump', 'var_dump'])
    ->not->toBeUsed();

arch('env functions only used in config')
    ->expect(['env'])
    ->not->toBeUsed();

arch('strict type is declared')
    ->expect('App')
    ->toUseStrictTypes();
