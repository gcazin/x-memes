<?php

namespace App\Filament\Resources\MediaResource\Pages;

use App\Filament\Resources\MediaResource;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;

class ListMedia extends ListRecords
{
    protected static string $resource = MediaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'Tout' => Tab::make(),
            'Approuvé' => Tab::make()
                ->modifyQueryUsing(fn ($query) => $query->where('approved', true)),
            'En attente' => Tab::make()
                ->modifyQueryUsing(fn ($query) => $query->where('approved', false)),
        ];
    }
}
