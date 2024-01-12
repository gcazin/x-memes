<?php

declare(strict_types=1);

namespace App\Filament\Resources\MediaResource\Widgets;

use App\Models\Media;
use App\Models\Tag;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = -3;


    protected function getStats(): array
    {
        return [
            Stat::make('Utilisateurs', User::all()->count()),
            Stat::make('Médias', Media::all()->count()),
            Stat::make('Tags', Tag::all()->count()),
        ];
    }
}
