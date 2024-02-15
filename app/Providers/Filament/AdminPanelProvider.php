<?php

declare(strict_types=1);

namespace App\Providers\Filament;

use App\Filament\Resources\MediaResource\Widgets\StatsOverviewWidget;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
use Filament\Navigation\NavigationItem;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                StatsOverviewWidget::class,
            ])
            ->navigationGroups([
                NavigationGroup::make()
                    ->label('Données'),
                NavigationGroup::make()
                    ->label('Paramètres'),
            ])
            ->navigationItems([
                NavigationItem::make('Telescope')
                    ->url(fn () => route('telescope'))
                    ->icon('heroicon-o-rocket-launch')
                    ->group('Paramètres'),
                NavigationItem::make('Pulse')
                    ->url(fn () => route('pulse'))
                    ->icon('heroicon-o-chart-bar')
                    ->group('Paramètres'),
                NavigationItem::make('Logs')
                    ->url(fn () => route('log-viewer.index'))
                    ->icon('heroicon-o-document-text')
                    ->group('Paramètres'),
                NavigationItem::make('Retour vers le site')
                    ->url(fn () => route('library'))
                    ->icon('heroicon-o-home')
                    ->group('Paramètres'),
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
