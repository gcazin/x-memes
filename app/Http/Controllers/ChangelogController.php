<?php

namespace App\Http\Controllers;

use Github\AuthMethod;
use Github\Client;
use Inertia\Inertia;

class ChangelogController extends Controller
{
    public function __invoke()
    {
        $client = new Client();
        $client->authenticate('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', null, AuthMethod::ACCESS_TOKEN);
        $releases = $client->api('repo')->releases()->all('gcazin', 'x-memes');

        return Inertia::render('Changelog', [
            'releases' => $releases,
        ]);
    }
}
