<?php

declare(strict_types=1);

namespace App\Facades;

use App\Models\Point as UserPoint;
use App\Models\PointType;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class SEO
{
    const DEFAULT_DESCRIPTION = 'X-Memes est une plateforme où tu peux t\'inscrire, publier et voir tous tes mèmes favoris !';

    protected ?string $title;
    protected ?string $description = self::DEFAULT_DESCRIPTION;
    protected ?string $type = null;
    protected ?string $media = null;
    protected ?string $author = null;
    protected ?string $url = null;

    public function __construct()
    {
        $this->title = null;
        $this->type = null;
        $this->media = null;
        $this->author = null;
        $this->url = null;
    }

    public function title(string $title): SEO
    {
        $this->title = $title;

        return $this;
    }

    public function description(string $description): SEO
    {
        $this->description = $description;

        return $this;
    }

    public function type(?string $type): SEO
    {
        $this->type = $type;

        return $this;
    }

    public function media(?string $media): SEO
    {
        $this->media = url('/storage/'.$media);

        return $this;
    }

    public function author(?string $author): SEO
    {
        $this->author = $author;

        return $this;
    }

    public function url(string $url): SEO
    {
        $this->url = $url;

        return $this;
    }

    public function share(): void
    {
        inertia()->share('seo.title', $this->title);
        inertia()->share('seo.description', $this->description);
        inertia()->share('seo.type', $this->type);
        inertia()->share('seo.media', $this->media);
        inertia()->share('seo.author', $this->author);
        inertia()->share('seo.url', $this->url ?? config('app.url'));
        //        inertia()->share('og.media', $templateURL);
    }
}
