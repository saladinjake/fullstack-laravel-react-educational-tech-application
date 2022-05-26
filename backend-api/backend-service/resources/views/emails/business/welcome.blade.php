@component('mail::message')
# Welcome to {{config('app.name')}}

Dear {{$user->businessProfile->company_name}},

It is with high delight we welcome you on board.

Click the link below to start your learning journey!

@component('mail::button', ['url' => $url])
Start
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
