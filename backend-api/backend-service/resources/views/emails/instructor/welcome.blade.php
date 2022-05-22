@component('mail::message')
# Welcome to {{config('app.name')}}

Dear {{$user->first_name}} {{$user->last_name}}, 

It is with high delight we welcome you on board as an Instructor on Questence platform.

Please be duly informed that your application is under review, and you will be contacted accordingly.

Cheers,<br>
{{ config('app.name') }}
@endcomponent
