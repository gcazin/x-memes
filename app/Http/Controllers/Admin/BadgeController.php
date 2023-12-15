<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Badges', [
            'badges' => Badge::all(),
        ]);
    }

    /**
     * Store a newly created badge in storage.
     */
    public function store(Request $request)
    {
        $badge = new Badge();

        $badge->name = $request->name;
        $badge->description = $request->description;
        $badge->condition = $request->condition;

        $badge->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // TODO: ajouter les règles de validation

        $badge = Badge::find($id);

        $badge->name = $request->name;
        $badge->description = $request->description;
        $badge->condition = $request->condition;

        $badge->update();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $badge = Badge::find($id);

        $badge->delete();
    }
}
