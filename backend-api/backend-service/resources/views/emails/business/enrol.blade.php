@component('mail::message')
# Course Enrollment

Dear <b>{{$user->businessProfile->company_name}}</b>, 

You have successfully enrolled to the course ({{$course->course_name}}) on Questence platform. 

<b>Course Start Date</b>: {{$course->start_date}}

<b>Course End Date</b>: {{$course->end_date}}

Click the link below to view course information.

@component('mail::button', ['url' => $url])
View Course
@endcomponent

Cheers,<br>
{{ config('app.name') }}
@endcomponent
