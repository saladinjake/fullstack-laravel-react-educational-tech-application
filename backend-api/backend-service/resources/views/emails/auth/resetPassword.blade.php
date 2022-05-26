@component('mail::message')
# Reset Password

You are receiving this email because we received a password reset request for your account.

This password reset link will expire in 60 minutes.

If you did not request a password reset, no further action is required.

@component('mail::button', ['url' => $url.'/'.$token.'?email='.$email])
Reset Password
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent