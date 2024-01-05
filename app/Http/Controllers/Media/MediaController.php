<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Events\MediaDestroyed;
use App\Http\Controllers\Controller;
use App\Http\Requests\Media\StoreMediaRequest;
use App\Http\Requests\Media\UpdateMediaRequest;
use App\Models\Media;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use App\Services\FileService;
use App\Services\MediaService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository,
        public TagRepository $tagRepository,
        public MediaService $mediaService,
        public FileService $fileService
    ) {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request): void
    {
        $file = $request->file('media_id');
        $path = Storage::disk('public')->put('medias', $file);

        // Create thumbnail if the media is a video
        $thumbnail = $this->fileService->createThumbnail($file, $path);

        $media = Media::create([
            'name' => $request->name,
            'path' => $path,
            'thumbnail_path' => 'medias/'.$thumbnail,
            'extension' => $file->extension(),
            'type' => $file->extension() === 'mp4' ? 'video' : 'image',
            'slug' => Str::slug($request->name),
            'hash' => $file->extension() !== 'mp4' ? $this->fileService->hashImage($file) : null,
            'user_id' => $request->user()->id,
        ]);

        // Add tags if present
        if ($request->tags) {
            $media->attachTags($request->tags);
        }

        if ($request->user()->isSuperAdmin()) {
            $this->mediaService->approve($media->id);
        } else {
            flash(
                'info',
                'Le média est en attente d\'approbation,
                un mail vous sera envoyé lorsqu\'il sera approuvé par un administrateur.'
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug): Response
    {
        $media = $this->mediaRepository->firstWhere('slug', $slug);

        if ($media) {
            $this->mediaService->related($media->id);
        }

        return Inertia::render('Medias/Show', [
            'media' => $media,
            'downloaded_file' => session('downloaded_file'),
            'related' => session('related'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Media $media)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMediaRequest $request, int $id): void
    {
        $media = $this->mediaRepository->find($id);

        $media->name = $request->name;

        $media->save();

        flash('success', 'Le média a bien été modifié.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): void
    {
        $media = $this->mediaRepository->find($id);

        // If media has tags
        if ($media->tags()->count() > 0) {
            $media->tags()->each(function ($tag) use ($media) {
                // We take medias with this tag except the media who should be deleted
                $medias = Media::withAnyTags([$tag])->get()->filter(function ($m) use ($media) {
                    return $media->id !== $m->id;
                });

                // If the media is the only one using this tag, we remove them
                if ($medias->count() === 0) {
                    $media->detachTag($tag);
                    $tag->delete();
                }
            });
        }

        Storage::delete($media->path);

        $media->delete();

        MediaDestroyed::dispatch($media);
    }
}
