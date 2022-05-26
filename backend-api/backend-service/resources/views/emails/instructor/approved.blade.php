@component('mail::message')
# Congratulations!

Dear {{$user->first_name}} {{$user->last_name}},

It is with high delight we welcome you on our bespoke e-learning solution.

Your EMS login credentials is as follows;

<b>Email</b>: {{$user->email}}

<b>Password</b>: {{$password}}

Click the link below to start.

@component('mail::button', ['url' => 'https://questence.org'])
Create Course
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
