<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    protected array $providers = ['google', 'github', 'twitter'];

    public function __construct(
        protected UserRepository $userRepository,
        protected UserService $userService
    ) {
    }

    public function redirect(Request $request)
    {
        $provider = $request->provider;

        if (in_array($provider, $this->providers)) {
            return Socialite::driver($provider)->redirect();
        }

        abort(403);
    }

    public function callback(Request $request)
    {
        $provider = $request->provider;

        if (in_array($provider, $this->providers)) {
            $data = Socialite::driver($request->provider)->user();

            $username = str()->slug($data->getName());
            $email = $data->getEmail();

            $user = $this->userRepository->firstWhere('email', $email);

            if (! $user) {
                if ($this->userRepository->firstWhere('username', $username)) {
                    $username = $username.'-'.Str::random(4);
                }

                if ($provider === 'twitter' || $provider === 'github') {
                    $user = $this->userService->create($username, $email, null, [
                        $provider => $data->getNickname(),
                    ]);
                } else {
                    $user = $this->userService->create($username, $email);
                }
            }

            auth()->login($user);

            return redirect(RouteServiceProvider::LIBRARY);
        }

        abort(404);
    }
}
