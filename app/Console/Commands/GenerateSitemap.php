<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Media;
use App\Models\Post;
use App\Models\User;
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
    public function handle(): void
    {
        $this->info('Sitemap generation in progress...');

        Sitemap::create()
            ->add(route('index'))
            ->add(route(name: 'library', absolute: false))
            ->add(route(name: 'search', absolute: false))
            ->add(route(name: 'collection', absolute: false))
            ->add(route(name: 'leaderboard', absolute: false))
            ->add(route(name: 'post.index', absolute: false))
            ->add(User::all())
            ->add(Media::all())
            ->add(Post::published()->get())
            ->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generation complete !');
    }
}
