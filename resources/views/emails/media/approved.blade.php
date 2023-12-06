<x-mail::message>
# Votre média {{ $media->name }} a été approuvé.

Félicitations, votre média a été approuvé par un administrateur !

<x-mail::button :url="route('media.show', $media->id)">
    Voir l'image
</x-mail::button>

{{ config('app.name') }}
</x-mail::message>
