<?php

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Http\Requests\Media\StoreMediaRequest;
use App\Http\Requests\Media\UpdateMediaRequest;
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
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        $file = $request->file('media_id');
        $path = Storage::disk('public')->put('media', $file);

        $media = Media::create([
            'name' => $request->name,
            'filename' => $path,
            'extension' => $file->getClientOriginalExtension(),
            'hash' => Comparator::convertHashToBinaryString(
                Comparator::hashImage($file)
            ),
            'user_id' => $request->user()->id,
        ]);

        if ($request->tags) {
            $media->attachTags($request->tags);
        }

        if ($request->user()->isSuperAdmin()) {
            $this->approve($request, $media->id);
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
    public function edit(Media $media)
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

        flash('success', 'Le média a bien été modifié.');
    }

    public function random()
    {
        if ($this->mediaRepository->allApprovedMedias()->count() !== 0) {
            return redirect(route('media.show', $this->mediaRepository->random()));
        }

        abort('404');
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

        flash('success','Le média a bien été approuvé et publié ! 🚀');

        Mail::to($media->user)->send(new MediaApprovedMail($media));

        Notification::send($media->user, new ApprovedMediaNotification($media));
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

        //        MediaDestroyed::dispatch($media);
    }
}
