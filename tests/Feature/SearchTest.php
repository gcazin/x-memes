<?php

use App\Models\Media;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

// TODO: fix this
/*it('should returns results with title', function () {
    User::factory()->create();
    Media::factory()->create(['name' => 'foo']);

    actingAsGuest()->get('rechercher?query=foo&type=medias')
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Search')
            ->has('result.data', 1)
            ->where('result.data.0.name', 'foo')
        );
});*/

it('should returns results with tags', function () {
    User::factory()->create();
    $media = Media::factory()->create(['name' => 'foo'])->attachTag('bar');

    actingAsGuest()->get('rechercher?query=bar&type=medias')
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Search')
            ->has('result.data', 1)
            ->where('result.data.0.name', 'foo')
        );
});
