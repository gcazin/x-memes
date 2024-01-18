<?php

namespace App\Filament\Pages;

use ShuvroRoy\FilamentSpatieLaravelHealth\Pages\HealthCheckResults as BaseHealthCheckResults;

class HealthCheckResults extends BaseHealthCheckResults
{
    protected static ?string $navigationIcon = 'heroicon-o-heart';

    public static function getNavigationGroup(): ?string
    {
        return 'Paramètres';
    }

    public function getHeading(): string
    {
        return 'Résultat de santé';
    }

    public static function getNavigationLabel(): string
    {
        return 'Santé du site web';
    }
}
