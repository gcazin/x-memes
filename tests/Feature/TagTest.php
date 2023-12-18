<?php

use Spatie\Tags\Tag;

test('should create tag', function () {
    actingAsSuperAdmin()->post(route('admin.tag.store'), [
        'name' => 'Tag',
    ]);

    expect(Tag::all()->count())->toBe(1);
});

test('should update tag', function () {
    $tag = Tag::create(['name' => 'Tag']);

    actingAsSuperAdmin()->put(route('admin.tag.update', $tag->id), [
        'name' => 'Updated tag',
    ]);

    expect($tag->refresh()->name)->toBe('Updated tag');
});

test('should destroy tag', function () {
    $tag = Tag::create(['name' => 'Tag']);

    actingAsSuperAdmin()->delete(route('admin.tag.destroy', $tag->id));

    expect(Tag::all()->count())->toBe(0);
});
