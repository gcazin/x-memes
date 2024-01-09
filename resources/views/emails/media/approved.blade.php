<x-mail::message>
# Ton média {{ $media->name }} a été approuvé.

Félicitations, ton mème a été approuvé par {{ $media->user->username }}.

<x-mail::button :url="route('media.show', $media->slug)">
    Voir la publication
</x-mail::button>

À bientôt sur {{ config('app.name') }} ! 🚀

Guillaume - {{ config('app.name') }}
</x-mail::message>
