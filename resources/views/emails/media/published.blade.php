<x-mail::message>
# Le mème {{ $media->name }} vient d'être publié sur le site et est en attente d'approbation.

<x-mail::button :url="route('filament.admin.resources.media.index')">
    Passer en revue le média
</x-mail::button>

À bientôt sur {{ config('app.name') }} ! 🚀

Guillaume de {{ config('app.name') }}
</x-mail::message>
