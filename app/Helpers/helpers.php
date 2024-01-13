<?php

declare(strict_types=1);

use Inertia\Inertia;

if (! function_exists('flash')) {
    function flash(string $type, string $message)
    {
        session()->flash('status', [
            'class' => $type,
            'message' => $message,
        ]);
    }

    function seoDescription(?string $description)
    {
        inertia()->share('seo.description', $description ?? 'X-Memes est une plateforme où tu peux t\'inscrire, publier et voir tous tes mèmes favoris !');
    }

    function openGraphData(string $title, string $type, string $image, string $url)
    {
        inertia()->share('og.title', $title);
        inertia()->share('og.type', $type);
        inertia()->share('og.image', url('/storage/'.$image));
        inertia()->share('og.url', $url);
    }
}
