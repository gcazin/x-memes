<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\SitemapGenerator;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Sitemap generation in progress...');

        SitemapGenerator::create('https://x-memes.com')
            ->configureCrawler(function ($crawler) {
                $crawler->ignoreRobots();
            })
            ->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generation complete !');
    }
}
