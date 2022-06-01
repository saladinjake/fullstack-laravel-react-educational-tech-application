<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BusinessProfileNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($notifications)
    {
        $this->notifications = $notifications;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
      ->greeting($this->notifications['greeting'])
      ->line($this->notifications['body'])
      ->action($this->notifications['actionText'], $this->notifications['actionURL'])
      ->line($this->notifications['thanks']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
           'message' => $this->notifications['body'],
           'user_id' => $this->notifications['user_id'],
           'profile_id' => $this->notifications['profile_id'],
           'notification_type' => "Business Profile Update"
       ];
    }
}
