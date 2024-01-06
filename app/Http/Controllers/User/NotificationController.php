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
        $notifications = auth()->user()->notifications()->paginate(10);

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

        $notification->markAsRead();

        return to_route('media.show', $notification->data['content']['slug']);
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
