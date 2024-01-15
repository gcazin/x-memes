<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\MediaResource\Pages;
use App\Models\Media;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;

    protected static ?string $label = 'Médias';

    protected static ?int $navigationSort = -0;

    protected static ?string $navigationIcon = 'heroicon-o-document-duplicate';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('approved_by')
                    ->label('Approuvé par')
                    ->relationship('user', 'username'),
                Forms\Components\Select::make('user_id')
                    ->label('Lié à')
                    ->relationship('user', 'username')
                    ->required(),
                Forms\Components\TextInput::make('name')
                    ->label('Titre')
                    ->required()
                    ->maxLength(191),
                Forms\Components\FileUpload::make('path')
                    ->directory('medias')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Select::make('type')
                    ->required()
                    ->options([
                        'image',
                        'video',
                    ]),
                Forms\Components\Toggle::make('approved')
                    ->label('Approuvé')
                    ->required(),
                Forms\Components\SpatieTagsInput::make('tags'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\IconColumn::make('approved')
                    ->label('Approuvé')
                    ->boolean(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Utilisateur')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Titre')
                    ->searchable(),
                Tables\Columns\TextColumn::make('path')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('thumbnail_path')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('download_count')
                    ->label('Nombre de téléchargements')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\SpatieTagsColumn::make('tags'),
                Tables\Columns\TextColumn::make('approved_by')
                    ->label('Approuvé par')
                    ->numeric()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Crée le')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
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
            'index' => Pages\ListMedia::route('/'),
            'create' => Pages\CreateMedia::route('/create'),
            'view' => Pages\ViewMedia::route('/{record}'),
            'edit' => Pages\EditMedia::route('/{record}/edit'),
        ];
    }
}
