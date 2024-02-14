<x-mail::message>
# Salut {{ $user->username }} !

Je t'envoie ce mail pour t'informer que X-Memes est sur ProductHunt, une plateforme permettant de présenter le site à un plus grand nombre! 🚀

C'est une étape importante pour moi, et si tu as quelques minutes à m'accorder, ce serait génial si tu pouvais passer sur ProductHunt et me donner un coup de main en votant pour moi et en laissant un petit commentaire.

Chaque vote compte énormément!

<x-mail::button url="https://www.producthunt.com/posts/x-memes">
Clique ici pour me soutenir
</x-mail::button>

Merci d'avance pour ton soutien!

<span class="font-bold">Guillaume</span> de <a href="{{ route('index') }}">{{ config('app.name') }}</a>
</x-mail::message>
