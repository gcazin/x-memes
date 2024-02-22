<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Models\MediaDownload;
use App\Models\User;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;

class DownloadChart extends ChartWidget
{
    protected static ?string $heading = 'Téléchargements';


    protected static ?int $sort = 3;
    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $data = Trend::model(MediaDownload::class)
            ->between(
                start: now()->startOfMonth(),
                end: now(),
            )
            ->perDay()
            ->count();

        return [
            'datasets' => [
                [
                    'label' => 'Nombre de téléchargements',
                    'data' => $data->map(fn (TrendValue $value) => $value->aggregate),
                ],
            ],
            'labels' => $data->map(fn (TrendValue $value) => $value->date),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
