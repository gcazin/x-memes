<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Enums\PointType;
use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Facades\PointFacade as Point;
use App\Facades\SeoFacade as SEO;
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
        $path = (string) Storage::disk('public')->put('medias', $file);

        // Create thumbnail if the media is a video
        $thumbnail = null;
        if ($file->extension() === 'mp4') {
            $thumbnail = $this->fileService->createThumbnail($file, $path);
        }

        $media = Media::create([
            'name' => $request->name,
            'path' => $path,
            'thumbnail_path' => $thumbnail ? 'medias/'.$thumbnail : null,
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

        MediaPublished::dispatch($media);

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
        $media = Media::with('user.followers')
            ->where('approved', true)
            ->firstWhere('slug', $slug);

        if ($media) {
            $related = $this->mediaService->related($media->id);
            $comments = $media
                ->comments()
                ->whereNull('parent_id')
                ->orderByDesc('created_at')
                ->paginate(10);

            Point::reward($media->id, PointType::MEDIA_SEEN);

            SEO::description('Télécharge le mème '.$media->name.' sur X-Memes dès maintenant !')
                ->title($media->name . ' sur ' . config('app.name'))
                ->type($media->type)
                ->media($media->path)
                ->author($media->user->username)
                ->url(route('media.show', $media->slug))
                ->share();

            return Inertia::render('Media/Show', [
                'media' => $media,
                'tags' => $media->tags,
                'comments' => $comments,
                'downloadedFile' => session('downloadedFile'),
                'related' => $related,
            ]);
        }

        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMediaRequest $request, int $id)
    {
        $media = $this->mediaRepository->find($id);

        $this->authorize('update', $media);

        $media->name = $request->name;
        $media->slug = Str::slug($request->name);

        // Sync tags
        if ($request->tags) {
            $media->syncTags($request->tags);
        }

        $media->save();

        flash('success', 'Le mème a bien été modifié.');

        if (! auth()->user()->isAdmin()) {
            return to_route('media.show', $media->slug);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $media = $this->mediaRepository->find($id);

        $this->authorize('delete', $media);

        MediaDestroyed::dispatchIf(auth()->user()->hasAnyRole(['super-admin', 'admin']), $media);

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

        // Remove approved notifications
        $notification = $media->user->notifications
            ->where('type', 'App\Notifications\Media\ApprovedMediaNotification')
            ->firstWhere('data.content.id', $media->id);
        if ($notification) {
            $notification->delete();
        }

        $media->delete();
    }
}
