<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use CloudinaryLabs\CloudinaryLaravel\MediaAlly;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Course extends Model
{
    use HasFactory, Notifiable, SoftDeletes, MediaAlly;


    protected $fillable = [
        'instructor_id', 'slug', 'business_id', 'category_id', 'language_id', 'certificate_id', 'course_code', 'course_name', 'price', 'start_date', 'end_date', 'enrollment_start',
        'enrollment_end', 'learning_style', 'course_description', 'course_overview', 'course_thumbnail', 'introduction_video', 'prerequisite_course',
        'entrance_exam', 'license', 'overall_grade_range', 'grace_period_on_deadline', 'course_cover_image', 'duration', 'topics', 'outcomes', 'status'
    ];

    protected $with = ['instructor'];

    /**
   * Protect $dates
   *
   * @var array
   */
  protected $dates = [
    'start_date',
    'end_date',
    'enrollment_start',
    'enrollment_end',
    'deleted_at'
  ];

    public function topCourse()
    {
        return $this->hasOne(TopCourse::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function instructor()
    {
        return $this->belongsTo(User::class);
    }

    public function instructors()
    {
        return $this->belongsToMany('App\Models\User', 'course_instructors', 'course_id', 'instructor_id');
    }

    public function businesses()
    {
        return $this->belongsTo(BusinessProfile::class);
    }

    public function bundles()
    {
        return $this->belongsToMany('App\Models\Bundle', 'bundle_courses', 'course_id', 'bundle_id');
    }

    public function courseTeams()
    {
        return $this->hasMany(CourseTeam::class, 'course_id');
    }

    public function curriculum()
    {
        return $this->hasMany(Curriculum::class, 'course_id');
    }

    public function certificates()
    {
        return $this->belongsTo('App\Models\Certificate');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function wishes()
    {
        return $this->hasMany(WishList::class);
    }

    public function scopeWithAndWhereHas($query, $relation, $constraint){
        return $query->whereHas($relation, $constraint)
                     ->with([$relation => $constraint]);
    }

    public function programmeLevels()
    {
        return $this->belongsToMany('App\Models\Course', 'programme_courses', 'course_id', 'programme_id')->withPivot('programme_level_id');
    }

}
