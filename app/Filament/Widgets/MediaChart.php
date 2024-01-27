<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Models\Media;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;

class MediaChart extends ChartWidget
{
    protected static ?string $heading = 'Médias';

    protected int|string|array $columnSpan = 'w-1/2';

    protected function getData(): array
    {
        $data = Trend::model(Media::class)
            ->between(
                start: now()->startOfMonth(),
                end: now(),
            )
            ->perDay()
            ->count();

        return [
            'datasets' => [
                [
                    'label' => 'Media publiés',
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
