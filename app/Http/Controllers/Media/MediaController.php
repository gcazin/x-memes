<?php

namespace App\Http\Controllers\Media;

use App\Events\MediaApproved;
use App\Http\Controllers\Controller;
use App\Http\Requests\Media\StoreMediaRequest;
use App\Http\Requests\Media\UpdateMediaRequest;
use App\Models\Media;
use App\Notifications\Media\DeletedMediaNotification;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use App\Services\FileService;
use App\Services\MediaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use SapientPro\ImageComparatorLaravel\Facades\Comparator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class MediaController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository,
        public TagRepository $tagRepository,
        public MediaService $mediaService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $defaultSort = '-created_at';
        $medias = QueryBuilder::for(Media::class)
            ->where('approved', true)
            ->defaultSort($defaultSort);

        $sortBy = collect([
            [
                'name' => 'Par date',
                'value' => 'created_at',
            ],
            [
                'name' => 'Par titre',
                'value' => 'name',
            ],
            [
                'name' => 'Par téléchargement',
                'value' => 'download_count',
            ],
        ]);
        if ($request->has('filters') || $request->has('sort')) {
            $medias
                ->allowedSorts($sortBy->pluck('value')->toArray());

            if ($request->has('filters.tags')) {
                $medias
                    ->whereHas('tags', function ($query) use ($request) {
                        $query->whereIn('id', explode(',', $request->query('filters')['tags']));
                    })
                    ->allowedFilters(AllowedFilter::exact('tags.id'));
            }
        }

        return Inertia::render('Library', [
            'medias' => $medias->paginate(),
            'tags' => $this->tagRepository->all(),
            'sortBy' => $sortBy->toArray(),
            'defaultSort' => $defaultSort,
            'duplicatedImage' => session('duplicatedImage'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        $file = $request->file('media_id');
        $path = Storage::disk('public')->put('medias', $file);

        // Create thumbnail if the media is a video
        $thumbnail = FileService::createThumbnail($file, $path);

        $media = Media::create([
            'name' => $request->name,
            'path' => $path,
            'thumbnail_path' => 'medias/'.$thumbnail,
            'extension' => $file->extension(),
            'hash' => $file->extension() !== 'mp4' ? Comparator::convertHashToBinaryString(
                Comparator::hashImage($file)
            ) : null,
            'user_id' => $request->user()->id,
        ]);

        // Add tags if present
        if ($request->tags) {
            $media->attachTags($request->tags);
        }

        if ($request->user()->isSuperAdmin()) {
            $this->approve($media->id);
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
    public function show(int $id): Response
    {
        $media = $this->mediaRepository->find($id);

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
     * Returns random resource.
     */
    public function random()
    {
        if ($this->mediaRepository->allApprovedMedias()->count() !== 0) {
            return redirect(route('media.show', $this->mediaRepository->random()));
        }

        abort(404);
    }

    /**
     * Checks if file is duplicated.
     */
    public function duplicate(Request $request): RedirectResponse
    {
        $imageHash = FileService::hashImage($request->file('media_id'));

        $similaryMedia = $this->mediaRepository->firstWhere('hash', $imageHash);

        if ($similaryMedia) {
            return back()->with('duplicatedImage', $similaryMedia->path);
        }

        return back()->with('duplicatedImage');
    }

    /**
     * Approves media.
     */
    public function approve(int $id): void
    {
        $media = $this->mediaService->approve($id);

        MediaApproved::dispatch($media);
    }

    /**
     * Download media.
     */
    public function download(int $id): RedirectResponse
    {
        $media = $this->mediaRepository->find($id);

        $media->download_count += 1;

        $media->update();

        return redirect()->back()->with('downloaded_file', base64_encode(Storage::get($media->path)));
    }

    /**
     * Like media.
     */
    public function like(int $id): void
    {
        $media = $this->mediaRepository->find($id);

        auth()->user()->toggleLike($media);
    }

    /**
     * Get related medias to another.
     */
    public function related(int $id): RedirectResponse
    {
        $media = Media::find($id);
        $tags = $media->tags->pluck('name')->toArray();

        $related = Media::withAnyTags($tags)
            ->get()
            ->where('id', '!=', $media->id)
            ->take(4);

        return back()->with('related', $related);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): void
    {
        $media = $this->mediaRepository->find($id);

        Storage::delete($media->path);

        $media->delete();

        Notification::send($media->user, new DeletedMediaNotification($media));

        //        MediaDestroyed::dispatch($media);
    }
}
