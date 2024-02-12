<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class LocalizationController extends Controller
{
    public function __invoke(Request $request, $language): RedirectResponse
    {
        app()->setLocale($language);
        session()->put('locale', $language);

        $previous = url()->previous();
        $languageSegment = explode('/', $previous)[3];

        $next = $previous;
        if (in_array($languageSegment, config('app.available_locales'))) {
            $next = str_replace($languageSegment, $language, $previous);
        }

        return redirect()->to($next);
    }
}
