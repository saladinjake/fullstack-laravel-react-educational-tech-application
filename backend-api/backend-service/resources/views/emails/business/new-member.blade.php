@component('mail::message')
# Welcome to {{$company->businessProfile->company_name}} on Questence!

Dear {{$newUser->first_name}} {{$newUser->last_name}}, 

It is with high delight we welcome you on our bespoke e-learning solution.

Your EMS login credentials is as follows;

<b>Email</b>: {{$newUser->email}}

<b>Password</b>: {{$password}}

Click the link below to start your learning journey.

@component('mail::button', ['url' => 'https://ems.org'])
Start Learning
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
