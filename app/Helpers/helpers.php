<?php

declare(strict_types=1);

if (! function_exists('flash')) {
    function flash(string $type, string $message)
    {
        session()->flash('status', [
            'class' => $type,
            'message' => $message,
        ]);
    }
}
