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

    function seoDescription(string $description)
    {
        Inertia::share('seo.description', $description);
    }
}
