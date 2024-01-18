<?php

declare(strict_types=1);

namespace App\Providers;

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
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        Model::shouldBeStrict(! $this->app->isProduction());

//        Model::preventLazyLoading(! $this->app->isProduction());

        Model::unguard();

        FilamentColor::register([
            'danger' => Color::hex('#b91c1c'),
            'gray' => Color::Zinc,
            'info' => Color::hex('#0e7490'),
            'primary' => Color::hex('#1e40af'),
            'success' => Color::hex('#15803d'),
            'warning' => Color::hex('#c2410c'),
        ]);
    }
}
