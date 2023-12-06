<?php

use Illuminate\Http\Request;

if (! function_exists('flash')) {
    function flash(Request $request, string $type, string $message)
    {
        $request->session()->flash('status', [
            'class' => $type,
            'message' => $message,
        ]);
    }
}
