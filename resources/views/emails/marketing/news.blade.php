<x-mail::message>
# Dites bonjour au tout nouveau classement de {{ config('app.name') }} !

Le fonctionnement du classement a été revu, et permet à tout le monde de monter dans le classement facilement !

Maintenant, vous avez beaucoup plus de manière de gagner des points :

<x-mail::table>
    | Description                                   | Points |
    |-----------------------------------------------|--------|
    | Votre média image a été approuvé.             | 10     |
    | Un utilisateur a aimé votre média.            | 4      |
    | Un utilisateur a téléchargé votre média.      | 2      |
    | Vous avez regardé un média.                   | 1      |
    | Un utilisateur s'est abonné à vous.           | 5      |
    | Une personne de l'équipe s'est abonné à vous. | 20     |
    | Récompense d'inscription.                     | 10     |
    | Récompense de connexion quotidienne.          | 1      |
</x-mail::table>

<x-mail::button :url="route('leaderboard')">
    Découvrir le nouveau classement
</x-mail::button>

On se voit sur {{ config('app.name') }} ! 🚀

Guillaume de {{ config('app.name') }}
</x-mail::message>
