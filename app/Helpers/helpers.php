<?php

declare(strict_types=1);

use Inertia\Inertia;

if (! function_exists('flash')) {
    /**
     * Flashes a message to the session for displaying notifications.
     */
    function flash(string $type, string $message): void
    {
        session()->flash('status', [
            'class' => $type,
            'message' => $message,
        ]);
    }

    /**
     * Shares the SEO description for the current Inertia page.
     */
    function seoDescription(?string $description): void
    {
        inertia()->share('seo.description', $description ?? 'X-Memes est une plateforme où tu peux t\'inscrire, publier et voir tous tes mèmes favoris !');
    }

    /**
     * Shares Open Graph (OG) data for the current Inertia page.
     */
    function openGraphData(string $title, string $type, string $image, string $url): void
    {
        $title = urlencode($title);
        $imageUrl = urlencode(url('/storage/'.$image));

        $templateId = 'e23b4a4f-83c2-4d9b-addb-051de54d819c';
        $versionNumber = 1;

        $templateURL = "https://ogcdn.net/{$templateId}/v{$versionNumber}/{$title}/{$imageUrl}/og.png";

        inertia()->share('og.title', $title);
        inertia()->share('og.type', $type);
        inertia()->share('og.image', $templateURL);
        inertia()->share('og.url', $url);
    }
}
