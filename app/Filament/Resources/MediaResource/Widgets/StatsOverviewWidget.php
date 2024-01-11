<?php

namespace App\Filament\Resources\MediaResource\Widgets;

use App\Models\Media;
use App\Models\Tag;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Utilisateurs', User::all()->count()),
            Stat::make('Médias', Media::all()->count()),
            Stat::make('Tags', Tag::all()->count()),
        ];
    }
}
