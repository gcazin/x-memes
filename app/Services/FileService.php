<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use SapientPro\ImageComparatorLaravel\Facades\Comparator;

class FileService
{
    /**
     * Create thumbnails from path
     */
    public static function createThumbnail(UploadedFile $file, string $path): ?string
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
     * Hash file
     */
    public static function hashImage(UploadedFile $image)
    {
        return Comparator::convertHashToBinaryString(Comparator::hashImage($image));
    }
}
