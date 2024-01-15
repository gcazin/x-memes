<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class AccountWidget extends Widget
{
    protected static ?int $sort = -3;

    protected int|string|array $columnSpan = 'full';

    protected static bool $isLazy = false;

    protected static string $view = 'filament-panels::widgets.account-widget';
}
