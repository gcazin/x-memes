<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Enums\PointType;
use App\Events\UserFollowed;
use App\Facades\PointFacade;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(int $id): void
    {
        $follower = auth()->user();
        $followable = User::find($id);

        $follower->toggleFollow($followable);

        if ($follower->hasAnyRole('super-admin', 'admin')) {
            PointFacade::setUser($followable)->reward($follower->id, PointType::STAFF_USER_FOLLOWING);
        }
        PointFacade::setUser($followable)->reward($follower->id, PointType::USER_FOLLOWING);

        UserFollowed::dispatchIf($follower->isFollowing($followable), $followable, $follower);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
