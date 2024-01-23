<?php

namespace App\Filament\Resources\PointTypeResource\Pages;

use App\Filament\Resources\PointTypeResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManagePointTypes extends ManageRecords
{
    protected static string $resource = PointTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
