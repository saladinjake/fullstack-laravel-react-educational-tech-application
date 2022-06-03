<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AssignedCourse extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    private $enrolledUser;
    private $enrolledCourse;
    private $business;

    public function __construct($enrolledUser, $enrolledCourse, $business)
    {
        $this->enrolledUser = $enrolledUser;
        $this->enrolledCourse = $enrolledCourse;
        $this->business = $business;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('New Course Assigned Questence')
        ->markdown('emails.business.assign-course')
        ->with([
            'user' => $this->enrolledUser,
            'course' => $this->enrolledCourse,
            'business' => $this->business,
            'url' => config('app.frontend').'/courses',
        ]);
    }
}
