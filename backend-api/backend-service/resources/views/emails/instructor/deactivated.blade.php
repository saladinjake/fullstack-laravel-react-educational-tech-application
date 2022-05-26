@component('mail::message')

Dear {{$user->first_name}} {{$user->last_name}}, 

We regret to inform you that your instructor account has been deactivated on EMS platform.

You will no longer have access to your account.

Cheers,<br>
{{ config('app.name') }}
@endcomponent
