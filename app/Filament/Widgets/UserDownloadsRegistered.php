<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Models\MediaDownload;
use Filament\Widgets\ChartWidget;

class UserDownloadsRegistered extends ChartWidget
{
    protected static ?string $heading = 'Téléchargements par statut d\'utilisateur';

    protected int | string | array $columnSpan = 'full';

    protected static ?string $maxHeight = '250px';

    protected static ?array $options = [
        'plugins' => [
            'legend' => [
                'display' => false,
            ],
        ],
    ];

    protected function getData(): array
    {
        $data = MediaDownload::query()
            ->selectRaw('
                CASE
                    WHEN user_id IS NULL THEN "Pas inscrit"
                    ELSE "Inscrit"
                END as connection_status,
                COUNT(*) as count
            ')
            ->groupBy('connection_status')
            ->get();

        // Extraire les labels et les données
        $labels = $data->pluck('connection_status');
        $counts = $data->pluck('count');

        return [
            'datasets' => [
                [
                    'label' => '',
                    'data' => $counts,
                    'backgroundColor' => [
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                    ],
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
