<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Badge\StoreBadgeRequest;
use App\Http\Requests\Badge\UpdateBadgeRequest;
use App\Models\Badge;
use App\Models\BadgeType;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Badges', [
            'badges' => Badge::all(),
            'badgeTypes' => BadgeType::all(),
        ]);
    }

    /**
     * Store a newly created badge in storage.
     */
    public function store(StoreBadgeRequest $request): void
    {
        $badge = new Badge();

        $badge->name = $request->name;
        $badge->description = $request->description;
        $badge->condition = $request->condition;
        $badge->badge_type_id = $request->badge_type_id;

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
    public function update(UpdateBadgeRequest $request, string $id): void
    {
        $badge = Badge::find($id);

        $badge->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
        $badge = Badge::find($id);

        $badge->delete();
    }
}
