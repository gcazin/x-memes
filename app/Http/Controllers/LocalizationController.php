<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class LocalizationController extends Controller
{
    public function __invoke(Request $request, $language): RedirectResponse
    {
        app()->setLocale($language);
        session()->put('locale', $language);

        $previousUrl = url()->previous();
        $languageSegment = explode('/', parse_url($previousUrl)['path'])[1];

        $nextUrl = $previousUrl;
        if (in_array($languageSegment, LaravelLocalization::getSupportedLanguagesKeys())) {
            $parseUrl = str_replace($languageSegment, $language, parse_url($previousUrl)['path']);
            $nextUrl = config('app.url').$parseUrl;
        }

        return redirect()->to($nextUrl);
    }
}
