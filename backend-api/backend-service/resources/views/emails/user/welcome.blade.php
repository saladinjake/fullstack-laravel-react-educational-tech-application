@component('mail::message')
# Welcome to {{config('app.name')}}

Dear {{$user->first_name}},

It is with high delight we welcome you on board.

Click the link below to update your profile and start your learning journey!

@component('mail::button', ['url' => $url])
View Courses 
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
