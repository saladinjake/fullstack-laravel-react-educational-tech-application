@component('mail::message')
# Welcome to {{config('app.name')}}

Dear {{$user->first_name}}, 

It is with high delight we welcome you on our bespoke e-learning solution.

Click the link below to learn more about us.

@component('mail::button', ['url' => 'https://questence.org/faqs'])
Learn More
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
