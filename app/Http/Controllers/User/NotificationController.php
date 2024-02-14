<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $notifications = tap(auth()->user()->notifications()->paginate(10), function ($value) {
            return collect($value->items())->each(function ($notification) {
                $notification->formatted_created_at = $notification->created_at->diffForHumans();
            });
        });

        return Inertia::render('User/Notifications', [
            'notifications' => $notifications,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $notification = auth()->user()->notifications->firstWhere('id', $id);

        if (is_null($notification->read_at)) {
            $notification->markAsRead();
        }

        // Approved media
        if ($notification->type === 'App\Notifications\Media\ApprovedMediaNotification') {
            return to_route('media.show', $notification->data['content']['slug']);
        }

        // New user notification for admin
        if (
            $notification->type === 'App\Notifications\User\NewUserNotification' ||
            $notification->type === 'App\Notifications\User\NewFollowerNotification'
        ) {
            return to_route('user.show', $notification->data['content']['username']);
        }

        return to_route('media.show', $notification->data['content']['slug']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string|array $id)
    {
        if ($request->has('notifications')) {
            collect($request->user()->unreadNotifications)->each(function ($notification) {
                $notification->markAsRead();
            });
        } else {
            $notification = auth()->user()->notifications->firstWhere('id', $id);

            if ($notification) {
                $notification->markAsRead();
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
