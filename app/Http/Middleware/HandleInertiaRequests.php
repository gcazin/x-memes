<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'stage' => config('app.version'),
            'language' => config('app.locale'),
            'auth' => [
                'user' => $request->user(),
                'roles' => function () use ($request) {
                    return $request->user() ? $request->user()->roles()->pluck('name') : null;
                },
                'notifications' => fn () => $request->user()
                    ? $request->user()->unreadNotifications->each(function ($notification) {
                        $notification->formatted_created_at = $notification->created_at->diffForHumans();
                    })
                    : null,
                'isConnected' => $request->user() !== null,
            ],
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
            ],
            'seo' => null,
            'jsonLD' => null,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
