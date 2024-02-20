<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaDownloadResource\Pages;
use App\Filament\Resources\MediaDownloadResource\RelationManagers;
use App\Models\MediaDownload;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MediaDownloadResource extends Resource
{
    protected static ?string $model = MediaDownload::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-down-on-square';

    protected static ?string $navigationGroup = 'Données';

    protected static ?string $label = 'Téléchargements';

    protected static ?int $navigationSort = 7;

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('media.name')
                    ->label('Média')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label("Nom d'utilisateur")
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('ip_address')
                    ->label('Adresse IP')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                //
            ])
            ->bulkActions([
                //
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMediaDownloads::route('/'),
        ];
    }
}
