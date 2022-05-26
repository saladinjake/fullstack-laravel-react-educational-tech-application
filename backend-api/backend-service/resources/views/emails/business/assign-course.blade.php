@component('mail::message')
# New Course Assignment

Dear <b>{{$user->first_name}} {{$user->last_name}}</b>, 

You have been assigned a course ({{$course->course_name}}) on EMS platform by <b>{{$business->company_name}}</b>!

<b>Course Start Date</b>: {{$course->start_date}}

<b>Course End Date</b>: {{$course->end_date}}

Click the link below to start your learning journey!

@component('mail::button', ['url' => $url])
View Course
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
