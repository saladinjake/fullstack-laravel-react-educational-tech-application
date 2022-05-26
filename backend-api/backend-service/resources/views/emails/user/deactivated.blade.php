@component('mail::message')
# Welcome to {{config('app.name')}}

Dear {{$user->first_name}} {{$user->last_name}}, 

We regret to inform you that your account has been deactivated on our platform.

You will no longer have access to your account.

Cheers,<br>
{{ config('app.name') }}
@endcomponent
