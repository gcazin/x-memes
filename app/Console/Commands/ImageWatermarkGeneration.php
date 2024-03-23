<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Media;
use App\Services\FileService;
use Illuminate\Console\Command;

class ImageWatermarkGeneration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'watermark:image';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates new images with a watermark';

    /**
     * Execute the console command.
     */
    public function handle(FileService $fileService): void
    {
        $this->info('Commencement de la génération des watermarks...');
        Media::all()->unique('path')->each(function (Media $media) use ($fileService) {
            $this->info('Génération du watermark pour '.$media->slug);
            $fileService->createWatermark($media);
        });
        $this->info('Génération terminée.');
    }
}
