<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Tags\Tag;

class TagController extends Controller
{
    /**
     * Display a listing of the tags.
     */
    public function index()
    {
        return Inertia::render('Admin/Tags', [
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Store a newly created tag in storage.
     */
    public function store(Request $request)
    {
        // TODO: ajouter les règles de validation

        $tag = Tag::findFromString($request->name);

        if ($tag) {
            flash($request, 'error', 'Ce tag existe déjà.');

            return;
        }

        Tag::create([
            'name' => $request->name,
        ]);

        flash($request, 'success', 'Le tag a bien été crée.');
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
        $tag = Tag::find($id);

        $tag->delete();
    }
}
