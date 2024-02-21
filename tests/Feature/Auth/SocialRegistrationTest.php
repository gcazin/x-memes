<?php

it('should register a new user when using social media', function () {
    $abstractUser = Mockery::mock('Laravel\Socialite\Two\User');

    $abstractUser
        ->shouldReceive('getId')
        ->andReturn(rand())
        ->shouldReceive('getName')
        ->andReturn(Str::random(10))
        ->shouldReceive('getEmail')
        ->andReturn(Str::random(10).'@gmail.com')
        ->shouldReceive('getAvatar')
        ->andReturn('https://en.gravatar.com/userimage');

    Socialite::shouldReceive('driver->user')->andReturn($abstractUser);

    $this->get('/auth/callback/google')->assertRedirect('/library');
});
