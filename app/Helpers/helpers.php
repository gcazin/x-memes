<?php

declare(strict_types=1);

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
}
