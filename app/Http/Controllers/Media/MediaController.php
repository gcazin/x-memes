<?php

declare(strict_types=1);

namespace App\Http\Controllers\Media;

use App\Enums\PointType;
use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Facades\PointFacade;
use App\Facades\PointFacade as Point;
use App\Facades\SeoFacade as SEO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Media\StoreMediaRequest;
use App\Http\Requests\Media\UpdateMediaRequest;
use App\Models\Media;
use App\Models\Tag;
use App\Repositories\MediaRepository;
use App\Repositories\TagRepository;
use App\Services\FileService;
use App\Services\MediaService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\SchemaOrg\Schema;

class MediaController extends Controller
{
    public function __construct(
        public MediaRepository $mediaRepository,
        public TagRepository $tagRepository,
        public MediaService $mediaService,
        public FileService $fileService
    ) {
    }

    public function index(Request $request): Response
    {
        $defaultSort = '-download_count';
        $medias = QueryBuilder::for(Media::class)
            ->where('approved', true)
            ->where('lang', app()->getLocale())
            ->with('tags')
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
                    ->whereHas('tags', function (Builder $query) use ($request) {
                        $query->whereIn('id', explode(',', $request->query('filters')['tags']));
                    })
                    ->allowedFilters(AllowedFilter::exact('tags.id'));
            }
        }

        $tags = Tag::query()
            ->whereLocale('name', app()->getLocale())
            ->get();

        SEO::title('Bibliothèque de mèmes')
            ->description('Télécharge, commente, aime et publie des mémés d\'Internet pour la communauté. Inscrivez-vous pour ne plus avoir à chercher des heures votre mémé préféré!')
            ->share();

        if (auth()->user()) {
            PointFacade::reward(null, PointType::DAILY_LOGIN);
        }

        return Inertia::render('Library', [
            'title' => 'Les meilleurs mèmes d\'Internet',
            'medias' => $medias->paginate(),
            'tags' => $tags,
            'sortBy' => $sortBy->toArray(),
            'defaultSort' => $defaultSort,
            'duplicatedImage' => session('duplicatedImage'),
        ]);
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
            $media->attachTags($this->mediaService->formatTags($request->tags));
        }

        MediaPublished::dispatch($media);

        if ($request->user()->isSuperAdmin()) {
            $this->mediaService->approve($media->id);
        } else {
            flash(
                'info',
                'Le média est en attente d\'approbation,
                un mail vous sera automatiquememnt envoyé lorsqu\'il sera approuvé par un administrateur.'
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

            if (auth()->user()) {
                Point::reward($media->id, PointType::MEDIA_SEEN);
            }

            $jsonLD = Schema::webPage()
                ->description('Télécharge le mème '.$media->name.' sur X-Memes dès maintenant !')
                ->interactionStatistic(
                    Schema::interactionCounter()
                        ->interactionType(Schema::downloadAction())
                        ->userInteractionCount($media->download_count)
                );

            if ($media->type === 'video') {
                $jsonLD->mainEntity(
                    Schema::videoObject()
                        ->contentUrl(url('/storage/'.$media->path))
                        ->name($media->name)
                        ->description('Télécharge le mème '.$media->name.' facilement sur X-Memes !')
                        ->thumbnailUrl($media->thumbnail_path)
                        ->uploadDate($media->getRawOriginal('created_at'))
                        ->author(Schema::person()
                            ->name($media->user->username)
                        )
                );
            } else {
                $jsonLD->mainEntity(
                    Schema::imageObject()
                        ->contentUrl(url('/storage/'.$media->path))
                );
            }

            SEO::description(__('Télécharge le mème :name sur X-Memes dès maintenant !', ['name' => $media->name]))
                ->title($media->name)
                ->type($media->type)
                ->url(route('media.show', $media->slug))
                ->image($media->type === 'image' ? $media->path : $media->thumbnail_path)
                ->schema($jsonLD->toScript())
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
    public function update(UpdateMediaRequest $request, int $id): RedirectResponse
    {
        $media = $this->mediaRepository->find($id);

        $this->authorize('update', $media);

        $media->name = $request->name;
        $media->slug = Str::slug($request->name);

        // Sync tags
        if ($request->tags) {
            $media->syncTags($this->mediaService->formatTags($request->tags));
        }

        $media->save();

        flash('success', 'Le mème a bien été modifié.');

        return to_route('media.show', $media->slug);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        $media = $this->mediaRepository->find($id);

        $this->authorize('delete', $media);

        MediaDestroyed::dispatchIf(auth()->user()->hasAnyRole(['super-admin', 'admin']), $media);

        // If media has tags
        if ($media->tags()->count() > 0) {
            $media->tags()->each(function (Tag $tag) use ($media) {
                // We take medias with this tag except the media who should be deleted
                $medias = Media::withAnyTags([$tag])->get()->filter(fn (Media $m) => $media->id !== $m->id);

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

        // Remove comments
        $media->comments()->delete();

        $media->delete();

        return redirect()->to(route('library'));
    }
}
