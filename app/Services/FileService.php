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
        $thumbnailName = null;
        if ($file->extension() === 'mp4') {
            $thumbnailName = 'thumbnails/'.explode('.', $file->hashName())[0].'.jpg';
            FFMpeg::fromDisk('public')
                ->open($path)
                ->getFrameFromSeconds(10)
                ->export()
                ->toDisk('medias')
                ->save($thumbnailName);
        }

        return $thumbnailName;
    }

    /**
     * Hashes an image using the provided UploadedFile.
     */
    public function hashImage(UploadedFile $image)
    {
        return Comparator::convertHashToBinaryString(Comparator::hashImage($image));
    }
}
