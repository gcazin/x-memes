<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\TagRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Tags\Tag;

class TagController extends Controller
{
    public function __construct(
        public TagRepository $tagRepository
    ) {
    }

    /**
     * Display a listing of the tags.
     */
    public function index()
    {
        return Inertia::render('Admin/Tags', [
            'tags' => $this->tagRepository->all(),
        ]);
    }

    /**
     * Store a newly created tag in storage.
     */
    public function store(Request $request)
    {
        Tag::findOrCreate($request->name);

        flash('success', 'Le tag a bien été crée.');
    }

    /**
     * Update the specified tag in storage.
     */
    public function update(Request $request, string $id)
    {
        $tag = Tag::find($id);

        $tag->name = $request->name;

        $tag->update();
    }

    /**
     * Remove the specified tag from storage.
     */
    public function destroy(int $id)
    {
        $tag = $this->tagRepository->find($id);

        $tag->delete();
    }
}
