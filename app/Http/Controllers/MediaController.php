<?php

namespace App\Http\Controllers;

use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;
use App\Mail\MediaApprovedMail;
use App\Models\Media;
use App\Notifications\Media\ApprovedMediaNotification;
use App\Notifications\Media\DeletedMediaNotification;
use App\Providers\RouteServiceProvider;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SapientPro\ImageComparatorLaravel\Facades\Comparator;
use Spatie\Tags\Tag;

class MediaController extends Controller
{
    public const APPROVE_AUTOMATICALLY_IF_SUPER_ADMIN = true;

    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medias = $this->mediaRepository->paginate();

        return Inertia::render('Library', [
            'medias' => $medias,
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Medias/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        $file = $request->file('media_id');
        $imageStored = Storage::disk('public')->put('media', $file);
        $hashedImage = Comparator::hashImage($file);
        $isSuperAdmin = self::APPROVE_AUTOMATICALLY_IF_SUPER_ADMIN ?
            $request->user()->isSuperAdmin()
            : false;

        $media = Media::create([
            'name' => $request->name,
            'filename' => $imageStored,
            'extension' => $file->getClientOriginalExtension(),
            'hash' => Comparator::convertHashToBinaryString($hashedImage),
            'user_id' => $request->user()->id,
        ]);

        if ($request->tags) {
            $media->attachTags($request->tags);
        }

        if ($isSuperAdmin) {
            $this->approve($request, $media->id);
        }

        if (! $isSuperAdmin) {
            flash(
                $request,
                'info',
                'Le média est en attente d\'approbation,
                un mail vous sera envoyé lorsqu\'il sera approuvé par un administrateur.'
            );
        }

        return redirect(RouteServiceProvider::HOME);
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $media, int $id)
    {
        $media = $this->mediaRepository->find($id);

        return Inertia::render('Medias/Show', [
            'media' => $media,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Library $library)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMediaRequest $request, int $id)
    {
        $media = $this->mediaRepository->find($id);

        $media->name = $request->name;

        $media->save();

        flash($request, 'success', 'Le média a bien été modifié.');
    }

    public function random()
    {
        if ($this->mediaRepository->allApprovedMedias()->count() !== 0) {
            return redirect(route('media.show', $this->mediaRepository->random()));
        }

        return abort('404');
    }

    public function duplicate(Request $request)
    {
        $imageHash = Comparator::convertHashToBinaryString(Comparator::hashImage($request->file('media_id')));

        $findSimilaryMedia = $this->mediaRepository->firstWhere('hash', $imageHash);

        if ($findSimilaryMedia) {
            return response()->json(['foundedImage' => $findSimilaryMedia]);
        }

        return response()->json(['foundedImage' => null]);
    }

    public function approve(Request $request, int $id)
    {
        $media = $this->mediaRepository->find($id);

        $media->approved = true;
        $media->approved_by = auth()->user()->id;
        $media->approved_at = now()->toDateTime();

        $media->update();

        flash(
            $request,
            'success',
            'Le média a bien été approuvé et publié ! 🚀'
        );

        Mail::to($media->user)->send(new MediaApprovedMail($media));

        Notification::send($media->user, new ApprovedMediaNotification($media));

        // Check badges
        MediaPublished::dispatch($media);
    }

    public function download(int $id)
    {
        $media = $this->mediaRepository->find($id);

        $media->download_count += 1;

        $media->update();

        return response()->json(['data' => base64_encode(Storage::get($media->filename))]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $media = $this->mediaRepository->find($id);

        Storage::delete($media->filename);

        $media->delete();

        Notification::send($media->user, new DeletedMediaNotification($media));

        MediaDestroyed::dispatch($media);
    }
}
