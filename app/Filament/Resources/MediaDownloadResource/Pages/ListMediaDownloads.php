<?php

namespace App\Filament\Resources\MediaDownloadResource\Pages;

use App\Filament\Resources\MediaDownloadResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMediaDownloads extends ListRecords
{
    protected static string $resource = MediaDownloadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            //
        ];
    }
}
