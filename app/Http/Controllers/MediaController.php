<?php

namespace App\Http\Controllers;

use App\Events\MediaDestroyed;
use App\Events\MediaPublished;
use App\Http\Requests\StoreLibraryRequest;
use App\Http\Requests\UpdateLibraryRequest;
use App\Models\Media;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use SapientPro\ImageComparatorLaravel\Facades\Comparator;
use Spatie\Tags\Tag;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Library', [
            'medias' => Media::with('user', 'tags')->where('approved', true)->get(),
            'tags' => Tag::all()
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
    public function store(StoreLibraryRequest $request)
    {
        $file = $request->file('media_id');
        $image_stored = Storage::put('media', $file);
        $hashedImage = Comparator::hashImage($file);
        $is_super_admin = $request->user()->hasRole('super-admin');

        $media = Media::create([
            'name' => $request->name,
            'filename' => $image_stored,
            'extension' => $file->getClientOriginalExtension(),
            'hash' => Comparator::convertHashToBinaryString($hashedImage),
            'approved' => $is_super_admin,
            'user_id' => $request->user()->id,
        ]);

        if ($request->tags) {
            $media->attachTags($request->tags);
        }

        MediaPublished::dispatchIf($is_super_admin, $media);

        return redirect(RouteServiceProvider::HOME);
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $media, int $id)
    {
        $media = Media::with('user', 'tags')->find($id);

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
    public function update(UpdateLibraryRequest $request, Library $library)
    {
        //
    }

    public function random()
    {
        $media = Media::all()->random();

        return redirect(route('media.show', $media));
    }

    public function duplicate(Request $request)
    {
        $imageHash = Comparator::convertHashToBinaryString(Comparator::hashImage($request->file('media_id')));

        $findSimilaryMedia = Media::all()->firstWhere('hash', $imageHash);

        if ($findSimilaryMedia) {
            return response()->json(['foundedImage' => $findSimilaryMedia]);
        }

        return response()->json(['foundedImage' => null]);
    }

    public function approve(int $id) {
        $media = Media::find($id);

        $media->approved = true;

        $media->save();

        MediaPublished::dispatch($media);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $media = Media::find($id);

        $media->delete();

        MediaDestroyed::dispatch($media);
    }
}
