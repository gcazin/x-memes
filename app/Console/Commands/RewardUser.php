<?php

namespace App\Console\Commands;

use App\Enums\PointType;
use App\Facades\PointFacade;
use App\Models\Media;
use App\Models\Point as UserPoint;
use App\Models\User;
use Illuminate\Console\Command;

class RewardUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:reward';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Décerne les points aux utilisateurs.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Commencement de la génération...');

        $users = User::all();

        $users->each(function (User $user) use ($users) {
            if (! $user->point()->exists()) {
                $point = new UserPoint();
                $point->user_id = $user->id;
                $point->save();
            }

            $medias = $user->medias()->where('approved', true);
            $followers = $user->followers();

            // User registered
            PointFacade::setUser($user)->reward(null, PointType::REGISTERED);
            $this->info($users->count() . ' ont gagné des points d\'inscription');

            // Medias approved
            $medias->each(function (Media $media) use ($user) {
                PointFacade::setUser($user)->reward($media->id, PointType::MEDIA_APPROVED);
                $this->info($user->username . ' a gagné des points pour les médias approuvés.');

                // Liked medias
                $likers = $media->likers();
                $likers->each(function () use ($user, $media) {
                    PointFacade::setUser($user)->reward($media->id, PointType::USER_LIKED_MEDIA);
                    $this->info($user->username . ' a gagné des points pour les likes sur ses médias.');
                });
            });

            // Followers
            $followers->each(function (User $follower) use ($user) {
                if ($follower->hasAnyRole('super-admin', 'admin')) {
                    PointFacade::setUser($user)->reward($follower->id, PointType::STAFF_USER_FOLLOWING);
                    $this->info($user->username . ' a gagné des points pour les follows du staff.');
                }
                PointFacade::setUser($user)->reward($follower->id, PointType::USER_FOLLOWING);
                $this->info($user->username . ' a gagné des points pour les follows.');
            });
        });

        $this->info('Fin de la génération.');
    }
}
