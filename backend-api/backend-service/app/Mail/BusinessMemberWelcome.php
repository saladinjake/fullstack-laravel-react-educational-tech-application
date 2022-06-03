<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BusinessMemberWelcome extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    private $newUser;
    private $password;
    private $company;

    public function __construct($newUser, $password, $company)
    {
        $this->newUser = $newUser;
        $this->password = $password;
        $this->company = $company;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $newUser = $this->newUser;
        $password = $this->password;
        $company = $this->company;

        return $this->subject('Welcome to Questence')->markdown('emails.business.new-member')->with(compact('newUser', 'password', 'company'));
    }
}
