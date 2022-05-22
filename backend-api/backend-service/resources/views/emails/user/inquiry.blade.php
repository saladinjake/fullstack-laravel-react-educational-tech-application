@component('mail::message')
# Message from {{ name }} through {{config('app.name')}}

Dear Support,

{{ message }}

<br>
{{ name }}
@endcomponent
