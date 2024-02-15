<x-mail::message>
# Salut {{ $user->username }} !

Merci de ton inscription. 🎉

Sur X-Memes, tu peux publier, voir, télécharger, aimer des mèmes... et encore plein de choses mais tu verras tout ça en parcourant le site !

C'est le lieu parfait pour retrouver le mème que tu as cherché désespérément sur X pendant plusieurs heures.

Si tu as la moindre question/ou une suggestion, n'hésite pas à me contacter sur X (<a href="https://x.com/gcazinonx" target="_blank">@gcazinonx</a>).

<x-mail::button :url="route('library')">
    Publier un mème
</x-mail::button>

Sur ce,

À bientôt sur <a href="{{ config('app.url') }}" target="_blank">X-Memes</a> ! 🚀

Guillaume de {{ config('app.name') }}
</x-mail::message>
