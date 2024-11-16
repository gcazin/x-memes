<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Facades\SeoFacade as SEO;
use Github\AuthMethod;
use Github\Client;
use Inertia\Inertia;

class ChangelogController extends Controller
{
    public function __invoke()
    {
        $client = new Client;
        $client->authenticate(config('services.github_api_key'), null, AuthMethod::ACCESS_TOKEN);
        $releases = $client->api('repo')->releases()->all('gcazin', 'x-memes');
        $commits = $client->api('repo')->commits()->all('gcazin', 'x-memes', ['sha' => 'main']);

        SEO::title('Journal des modifications')
            ->description('Récapitulatif des changements sur X-Memes')
            ->share();

        return Inertia::render('Changelog', [
            'releases' => $releases,
            'commits' => $commits,
        ]);
    }
}
