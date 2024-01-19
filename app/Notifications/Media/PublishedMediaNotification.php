<?php

declare(strict_types=1);

namespace App\Notifications\Media;

use App\Models\Media;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class PublishedMediaNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Media $media
    ) {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return $this->getNotificationContent();
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->getNotificationContent());
    }

    /**
     * Get the notification's content.
     */
    public function getNotificationContent(): array
    {
        return [
            'title' => "Un mème vient d'être publié!",
            'content' => $this->media,
        ];
    }
}
