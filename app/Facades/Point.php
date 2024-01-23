<?php

declare(strict_types=1);

namespace App\Facades;

use App\Models\Point as UserPoint;
use App\Models\PointType;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class Point
{
    protected Authenticatable|null|User $user;

    public function __construct()
    {
        $this->user = auth()->user();
    }

    /**
     * Sets the user.
     */
    public function setUser(User $user): Point
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Rewards a user with points for a specific action on a model.
     */
    public function reward(?int $id, string $action): void
    {
        $type = PointType::firstWhere('name', $action);

        if ($this->user) {
            if (! $this->userExistsInLeaderboard()) {
                $this->putUserInLeaderboard();
            }

            if (is_null($this->user)) {
                dd($this->user);
            }
            if (($this->user->email !== auth()->user()?->email) || ! $id) {
                $model = $this->user->points();
            } else {
                $model = $type->model::find($id)->points();
            }

            if (! $id) {
                $userPointAction = $model
                    ->where('point_type_id', '=', $type->id);
            } else {
                $userPointAction = $model
                    ->where('point_type_id', '=', $type->id)
                    ->where('pointable_id', '=', $id)
                    ->whereHas('type', function ($query) use ($type) {
                        $query->where('model', $type->model);
                    });
            }

            if (! $userPointAction->exists()) {
                $model->create([
                    'user_id' => $this->user->id,
                    'point_type_id' => $type->id,
                    'pointable_id' => $id,
                ]);

                $point = UserPoint::firstWhere('user_id', $this->user->id);

                $point->update(['amount' => $point->amount + $type->amount]);
            }
        }
    }

    /**
     * Checks if the user exists in the leaderboard.
     */
    public function userExistsInLeaderboard(): bool
    {
        return $this->user->point()->exists();
    }

    /**
     * Puts the user in the leaderboard if they don't already exist.
     */
    public function putUserInLeaderboard(): void
    {
        $point = new UserPoint();
        $point->user_id = $this->user->id;
        $point->save();
    }
}
