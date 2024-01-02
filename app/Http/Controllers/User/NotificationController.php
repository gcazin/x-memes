<?php

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
        $notifications = auth()->user()->notifications->each(function ($notification) {
            $notification->formatted_created_at = $notification->created_at->diffForHumans();
        });

        return Inertia::render('User/Notifications', [
            'notifications' => $notifications,
        ]);
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
    public function update(Request $request, string|array $id)
    {
        if ($request->has('notifications')) {
            foreach ($request->user()->unreadNotifications as $notification) {
                $notification->markAsRead();
            }
        } else {
            $notification = auth()->user()->notifications->where('id', $id)->first();

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
