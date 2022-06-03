<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BusinessWelcome extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    //public $user;
    //public $profile;

    public function __construct($user, $profile)
    {
        $this->user = $user;
        $this->profile = $profile;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
             return $this->subject('Welcome to Questence Business')
             ->markdown('emails.business.welcome')
             ->with([
                 //'user' => $this->user->company_name,
                 'user' => $this->user,
                 'profile' => $this->profile,
                 'url' => config('app.frontend').'/login',
             ]);
    }
}
