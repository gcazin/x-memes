<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Support\RawJs;
use Filament\Widgets\ChartWidget;

class UserRegisteredWith extends ChartWidget
{
    protected static ?string $heading = 'Inscription par méthode d\'authentification';

    protected static ?string $maxHeight = '250px';

    protected function getData(): array
    {
        $data = User::query()
            ->selectRaw('id, COALESCE(registered_with, "not available") as registered_with, COUNT(*) as count')
            ->groupBy('registered_with')
            ->get();

        $labels = $data->pluck('registered_with');
        $counts = $data->pluck('count');

        return [
            'datasets' => [
                [
                    'data' => $counts,
                    'backgroundColor' => [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array|RawJs|null
    {
        return [
            'scales' => [
                'x' => ['display' => false],
                'y' => ['display' => false]
            ],
        ];
    }
}
