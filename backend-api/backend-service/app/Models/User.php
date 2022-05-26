<?php

namespace App\Models;

//use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\VerifyEmailNotification;
use CloudinaryLabs\CloudinaryLaravel\MediaAlly;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use jeremykenedy\LaravelRoles\Traits\HasRoleAndPermission;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, HasRoleAndPermission, HasApiTokens, MediaAlly;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->connection = env('APP_ENV') === 'testing' ? 'mysql_test' : env('DB_CONNECTION');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'first_name', 'middle_name', 'last_name', 'email', 'phone_number', 'password', 'status', 'image_url', 'category',
    ];

    /**
     * Always return user details
     *
     * @var array
     */
    protected $with = ['instructorProfile'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'status',
        'category',
        'first_time_login', 'email_verified_at','created_at', 'updated_at', 'deleted_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * Accessor.
     *
     * @param string $firstName
     * @return string
     */
    public function getFirstNameAttribute($firstName)
    {
        return ucfirst($firstName);
    }

    /**
     * Accessor.
     *
     * @param string $lastName
     * @return string
     */
    public function getLastNameAttribute($lastName)
    {
        return ucfirst($lastName);
    }

    public function businessProfile()
    {
        return $this->hasOne(BusinessProfile::class);
    }

    public function businesses()
    {
        return $this->belongsToMany('App\Models\BusinessProfile', 'business_members', 'member_id', 'business_id')->withPivot('staff_no', 'job_designation', 'status')->withTimestamps();
    }

    public function certificates()
    {
        return $this->belongsToMany('App\Models\Certificate', 'user_certificates', 'user_id', 'certificate_id');
    }

    public function learnerProfile()
    {
        return $this->hasOne(LearnerProfile::class);
    }
    public function courses()
    {
        return $this->hasMany(Course::class, 'instructor_id');
    }

    public function course_instructors()
    {
        return $this->belongsToMany('App\Models\Course', 'course_instructors', 'instructor_id', 'course_id');
    }

    public function instructorProfile()
    {
        return $this->hasOne(InstructorProfile::class);
    }

    public function courseTeams()
    {
        return $this->hasMany(CourseTeam::class, 'member_id');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification);
    }

    public function wishes()
    {
        return $this->hasMany(WishList::class);
    }

    public function scopeWithAndWhereHas($query, $relation, $constraint){
        return $query->whereHas($relation, $constraint)
                     ->with([$relation => $constraint]);
    }
}
