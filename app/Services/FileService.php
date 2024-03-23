<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Media;
use FFMpeg\Format\Video\X264;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use SapientPro\ImageComparatorLaravel\Facades\Comparator;
use Spatie\Image\Image;

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
     * Creates a watermark for the given UploadedFile and saves it to the specified path.
     */
    public function createWatermark(Media $media): void
    {
        $watermark = public_path('/images/watermark/watermark.png');

        if ($media->type === 'image') {
            $image = Image::load('storage/'.$media->path);

            $image
                ->watermark(
                    $watermark,
                    paddingX: 20,
                    paddingY: 20,
                    height: (int) round((5 * round($image->getHeight())) / 100)
                )
                ->save();
        } /*else {
            // Take the original name
            $fileName = explode('/', $media->path)[1];

            // Create converted file with the same name
            FFMpeg::fromDisk('public')
                ->open($media->path)
                ->export()
                ->toDisk('public')
                ->save('medias/converted/'.$fileName);

            // Delete original
            Storage::delete($media->path);

            // Add watermark
            FFMpeg::fromDisk('public')
                ->open('medias/converted/'.$fileName)
                // TODO: Good size for watermark
                ->addFilter([
                    '-vf',
                    'movie='.$watermark.'[watermark];[in][watermark]
                    overlay=x=(main_w-overlay_w-20):y=(main_h-overlay_h-20)
                    [out]'
                ])
                ->export()
                ->inFormat(new X264())
                ->toDisk('public')
                ->save($media->path);

            // Delete converted
            Storage::delete('medias/converted/'.$fileName);
        }*/
    }

    /**
     * Hashes an image using the provided UploadedFile.
     */
    public function hashImage(UploadedFile $image): string
    {
        return Comparator::convertHashToBinaryString(Comparator::hashImage($image));
    }
}
