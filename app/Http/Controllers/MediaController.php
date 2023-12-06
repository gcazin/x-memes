<?php

namespace App\Http\Controllers;

use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;
use App\Mail\MediaApproved;
use App\Models\Media;
use App\Providers\RouteServiceProvider;
use App\Repositories\MediaRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SapientPro\ImageComparatorLaravel\Facades\Comparator;
use Spatie\Tags\Tag;

class MediaController extends Controller
{
    public const APPROVE_AUTOMATICALLY_IF_SUPER_ADMIN = false;

    public function __construct(
        public MediaRepository $mediaRepository
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Library', [
            'medias' => Media::where('approved', true)->paginate(6),
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Medias/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        $file = $request->file('media_id');
        $imageStored = Storage::put('media', $file);
        $hashedImage = Comparator::hashImage($file);
        $isSuperAdmin = self::APPROVE_AUTOMATICALLY_IF_SUPER_ADMIN ?
            $request->user()->isSuperAdmin()
            : false;

        $media = Media::create([
            'name' => $request->name,
            'filename' => $imageStored,
            'extension' => $file->getClientOriginalExtension(),
            'hash' => Comparator::convertHashToBinaryString($hashedImage),
            'approved' => $isSuperAdmin,
            'user_id' => $request->user()->id,
        ]);

        if ($request->tags) {
            $media->attachTags($request->tags);
        }

        if (! $isSuperAdmin) {
            flash($request, 'info', 'Le média est en attente d\'approbation,
            un mail vous sera envoyé lorsqu\'il sera approuvé par un administrateur.');
        }

        MediaPublished::dispatchIf($isSuperAdmin, $media);

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
        $media = $this->mediaRepository->random();

        return redirect(route('media.show', $media));
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

    public function approve(int $id)
    {
        $media = $this->mediaRepository->find($id);

        $media->approved = true;

        $media->save();

        Mail::to($media->user)->send(new MediaApproved($media));
        MediaPublished::dispatch($media);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $media = $this->mediaRepository->find($id);

        $media->delete();

        MediaDestroyed::dispatch($media);
    }
}
