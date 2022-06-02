<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Notifications\VerifyEmail as ApiVerifyEmail;

class VerifyEmailNotification extends ApiVerifyEmail
{
   /**
   * Get the verification URL for the given notifiable.
   *
   * @param mixed $notifiable
   * @return string
   */
   protected function verificationUrl($notifiable)
   {
    return URL::temporarySignedRoute('verification.api.verify',
    Carbon::now()->addMinutes(180), ['userId' => $notifiable->getKey()]);
   }
}
