@component('mail::message')
# Welcome to {{config('app.name')}}

Dear {{$user->first_name}} {{$user->last_name}}, 

We regret to inform you that your INSTRUCTOR APPLICATION on our platform wasn't approved. 

Click the link below to learn more about rejected applications.

@component('mail::button', ['url' => 'https://questence.org/faqs'])
Learn More
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
