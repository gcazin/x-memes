<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Http\UploadedFile;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use SapientPro\ImageComparatorLaravel\Facades\Comparator;

class FileService
{
    /**
     * Creates a thumbnail for the given UploadedFile and saves it to the specified path.
     */
    public function createThumbnail(UploadedFile $file, string $path): ?string
    {
        $thumbnailName = 'thumbnails/'.explode('.', $file->hashName())[0].'.jpg';

        $getFrameFromMiddle = FFMpeg::fromDisk('public')
            ->open($path)
            ->getDurationInSeconds() / 2;

        FFMpeg::fromDisk('public')
            ->open($path)
            ->getFrameFromSeconds($getFrameFromMiddle)
            ->export()
            ->toDisk('medias')
            ->save($thumbnailName);

        return $thumbnailName;
    }

    /**
     * Hashes an image using the provided UploadedFile.
     */
    public function hashImage(UploadedFile $image): string
    {
        return Comparator::convertHashToBinaryString(Comparator::hashImage($image));
    }
}
