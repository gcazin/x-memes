<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Waitlist;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class WaitlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Waitlist');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void
    {
        $request->validate([
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(Waitlist::class),
            ],
        ]);

        $waitList = new Waitlist;

        $waitList->email = $request->email;

        $waitList->save();
    }
}
