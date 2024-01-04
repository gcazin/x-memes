<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Media;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;

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

        Sitemap::create()
            ->add('/')
            ->add('/bibliotheque')
            ->add('/classement')
            ->add(Media::all())
            ->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generation complete !');
    }
}
