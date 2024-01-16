<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Events\MediaApproved;
use App\Filament\Resources\MediaResource\Pages;
use App\Models\Media;
use App\Services\MediaService;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Table;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;

    protected static ?string $label = 'Médias';

    protected static ?int $navigationSort = -0;

    protected static ?string $navigationIcon = 'heroicon-o-document-duplicate';

    public function __construct(
        protected MediaService $mediaService
    ) {
    }

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
                    ->maxLength(100)
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('thumbnail_path')
                    ->directory('medias/thumbnails')
                    ->label('Chemin')
                    ->columnSpanFull()
                    ->hidden(fn (Media $media) => is_null($media->thumbnail_path))
                    ->required(),
                Forms\Components\FileUpload::make('path')
                    ->directory('medias')
                    ->imagePreviewHeight('250')
                    ->fetchFileInformation(false)
                    ->label('Chemin')
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Select::make('type')
                    ->required()
                    ->options([
                        'image' => 'Image',
                        'video' => 'Vidéo',
                    ])
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('approved')
                    ->label('Approuvé')
                    ->required(),
                Forms\Components\Select::make('approved_by')
                    ->label('Approuvé par')
                    ->relationship(name: 'user', titleAttribute: 'username'),
                Forms\Components\SpatieTagsInput::make('tags')
                    ->columnSpanFull(),
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
                Action::make('approved')
                    ->hidden(fn (Media $media) => $media->approved)
                    ->requiresConfirmation()
                    ->label('Approuvé')
                    ->action(function (Media $media) {
                        $media->approved = true;
                        $media->approved_by = auth()->user()->id;
                        $media->approved_at = now()->toDateTime();

                        $media->update();

                        MediaApproved::dispatch($media);
                    }),
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                ]),
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

    public static function getNavigationGroup(): ?string
    {
        return 'Données';
    }
}
