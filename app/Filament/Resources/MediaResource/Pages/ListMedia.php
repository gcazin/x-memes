<?php

declare(strict_types=1);

namespace App\Filament\Resources\MediaResource\Pages;

use App\Filament\Resources\MediaResource;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

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
                ->modifyQueryUsing(fn (Builder $query) => $query->where('approved', true)),
            'En attente' => Tab::make()
                ->modifyQueryUsing(fn (Builder $query) => $query->where('approved', false)),
        ];
    }
}
