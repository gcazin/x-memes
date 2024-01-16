<x-mail::message>
# Ton média {{ $media->name }} a été approuvé.

Félicitations, ton mème a été approuvé par {{ \App\Models\User::find($media->approved_by)->username }}.

<x-mail::button :url="route('media.show', $media->slug)">
    Voir la publication
</x-mail::button>

À bientôt sur {{ config('app.name') }} ! 🚀

Guillaume de {{ config('app.name') }}
</x-mail::message>
