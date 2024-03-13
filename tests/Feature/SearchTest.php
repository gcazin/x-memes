<?php

use App\Models\Media;
use App\Models\User;
use Inertia\Testing\AssertableInertia;
use Sti3bas\ScoutArray\Facades\Search;

// TODO: fix this
/*it('should returns results with name', function () {
    User::factory()->create();
    $media = Media::factory()->create([
        'name' => 'foo',
        'approved' => true
    ]);

    Search::assertSyncedTo('medias', $media);

    actingAsGuest()->get('rechercher?query=foo&type=medias');
});*/

it('can see search page', function () {
    $response = actingAsGuest()->get(route('search'));

    expect($response->status())->toBe(200);
});

it('should returns no result if media is not approved', function () {
    User::factory()->create();
    Media::factory()->create([
        'name' => 'foo',
        'approved' => false,
    ]);

    actingAsGuest()->get(route('search', [
        'type' => 'medias',
        'query' => 'foo',
    ]))->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Search')
        ->has('result.data', 0)
    );
});

/*it('should returns results with tags', function () {
    User::factory()->create();
    Media::factory()->create([
        'name' => 'foo',
        'approved' => true
    ])->attachTag('bar');

    actingAsGuest()->get('rechercher?query=bar&type=medias')
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Search')
            ->has('result.data', 1)
            ->where('result.data.0.name', 'foo')
        );
});*/
