<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Enums\PointType;
use App\Facades\PointFacade;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Services\UserService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => [
                'required',
                'string',
                'max:25',
                'alpha_dash',
                Rule::unique(User::class, 'username'),
            ],
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = $this->userService->create($request->username, $request->email, Hash::make($request->password));

        event(new Registered($user));

        Auth::login($user);

        PointFacade::reward(null, PointType::REGISTERED);

        return redirect(RouteServiceProvider::LIBRARY);
    }
}
