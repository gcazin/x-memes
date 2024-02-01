<?php

declare(strict_types=1);

namespace App\Facades;

class SEO
{
    const DEFAULT_DESCRIPTION = 'X-Memes est une plateforme où tu peux t\'inscrire, publier et voir tous tes mèmes favoris !';

    protected ?string $title;

    protected ?string $description = self::DEFAULT_DESCRIPTION;

    protected ?string $type = null;

    protected ?string $image = null;

    protected ?string $media = null;

    protected ?string $url = null;

    protected ?string $schema = null;

    public function __construct()
    {
        $this->title = null;
        $this->type = null;
        $this->image = null;
        $this->media = null;
        $this->url = null;

        $this->schema = null;
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

    public function image(?string $image): SEO
    {
        $this->image = url('/storage/'.$image);

        return $this;
    }

    public function media(?string $media): SEO
    {
        $this->media = url('/storage/'.$media);

        return $this;
    }

    public function url(string $url): SEO
    {
        $this->url = $url;

        return $this;
    }

    public function schema(string $schema): SEO
    {
        $this->schema = $schema;

        return $this;
    }

    public function share(): void
    {
        inertia()->share('seo.title', $this->title);
        inertia()->share('seo.description', $this->description);
        inertia()->share('seo.type', $this->type);
        inertia()->share('seo.image', $this->image);
        inertia()->share('seo.media', $this->media);
        inertia()->share('seo.url', $this->url ?? config('app.url'));
        inertia()->share('jsonLD', $this->schema);
    }
}
