<x-mail::message>
# Ton média {{ $media->name }} a été supprimé ! 😓

Salut {{ $media->user->username }},

J'espère que tu passes une bonne journée !

On voulait t'informer que ton mème sur X-Memes a été supprimé.

Il a pu être supprimé pour différentes raisons, image/vidéo en doublon, image non conforme aux règles...

Si t'as des questions ou si tu veux discuter de quoi que ce soit,
je reste disponible sur X (<a href="https://x.com/gcazinonx" target="_blank">@gcazin</a>).

<x-mail::button :url="route('media.show', $media->slug)">
    Voir la publication
</x-mail::button>

À bientôt sur {{ config('app.name') }} ! 🚀

Guillaume de {{ config('app.name') }}
</x-mail::message>
