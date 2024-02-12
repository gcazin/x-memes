<?php

declare(strict_types=1);

namespace App\Providers;

use App\Facades\Point;
use App\Facades\SEO;
use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentColor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('point', function () {
            return new Point();
        });

        $this->app->bind('seo', function () {
            return new SEO();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        Model::shouldBeStrict(! $this->app->isProduction());

        Model::preventLazyLoading(! $this->app->isProduction());

        Model::unguard();

        FilamentColor::register([
            'danger' => Color::hex('#b91c1c'),
            'gray' => Color::Zinc,
            'info' => Color::hex('#0e7490'),
            'primary' => Color::hex('#1e40af'),
            'success' => Color::hex('#15803d'),
            'warning' => Color::hex('#c2410c'),
        ]);

        view()->composer('*', function ($view) {
            $languageUrls = [];

            $currentLocale = request()->segment(1);
            $locales = config('app.available_locales'); // ['en', 'fr']
            $defaultLocale = config('app.fallback_locale'); // 'en'

            // Remove language prefix if not default from segments
            $noPrefixSegments = request()->segments();
            if ($currentLocale !== $defaultLocale && in_array($currentLocale, $locales)) {
                array_shift($noPrefixSegments);
            }
            // Keep all segments
            $noPrefixSegments = implode('/', $noPrefixSegments);

            // Generate an array of locales associated with URLs
            foreach ($locales as $locale) {
                if ($locale === $defaultLocale) {
                    $languageUrls[$locale] = $noPrefixSegments;
                } else {
                    $languageUrls[$locale] =  $locale . '/' . $noPrefixSegments;
                }
            }

            return $view->with('languageUrls', $languageUrls);
        });
    }
}
