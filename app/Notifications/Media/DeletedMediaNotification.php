<?php

namespace App\Notifications\Media;

use App\Models\Media;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DeletedMediaNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Media $media,
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
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable)
    {
        //
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => "Ton média {$this->media->title} a été supprimé !",
            'content' => $this->media,
        ];
    }
}
