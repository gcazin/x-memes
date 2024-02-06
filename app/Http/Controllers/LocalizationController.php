<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;

class LocalizationController extends Controller
{
    public function __invoke($language)
    {
        app()->setLocale($language);
        session()->put('locale', $language);

        return redirect()->to(app()->getLocale().'/'.RouteServiceProvider::LIBRARY);
    }
}
