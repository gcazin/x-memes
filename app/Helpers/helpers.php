<?php

if (! function_exists('flash')) {
    function flash(string $type, string $message)
    {
        session()->flash('status', [
            'class' => $type,
            'message' => $message,
        ]);
    }
}
