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
     * Store a newly created resource in storage.
     */
    public function store(int $id): void
    {
        $follower = auth()->user();
        $followable = User::find($id);

        $follower->toggleFollow($followable);

        if ($follower->hasAnyRole('super-admin', 'admin')) {
            if ($follower->isFollowing($followable)) {
                PointFacade::setUser($followable)->reward($followable->id, PointType::STAFF_USER_FOLLOWING);
            }
        } else {
            if ($follower->isFollowing($followable)) {
                PointFacade::setUser($followable)->reward($followable->id, PointType::USER_FOLLOWING);
            }
        }

        UserFollowed::dispatchIf($follower->isFollowing($followable), $followable, $follower);
    }
}
