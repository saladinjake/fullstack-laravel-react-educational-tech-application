<?php

namespace App\Models;

use CloudinaryLabs\CloudinaryLaravel\MediaAlly;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class BusinessProfile extends Model
{
    use HasFactory, Notifiable, MediaAlly;
    protected $fillable = [
        'company_name', 'hq_address', 'company_description', 'company_phone', 'country_code', 'registration_number', 'company_logo', 'no_of_employees', 'industry_id',
        'type_of_institution', 'color_theme', 'country_id', 'linkedin_page', 'facebook_page', 'website', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function members()
    {
        return $this->belongsToMany('App\Models\User', 'business_members', 'business_id', 'member_id')->withPivot('staff_no', 'job_designation', 'status')->withTimestamps();
    }

    public function courses()
    {
        return $this->hasMany(Course::class, 'business_id');
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function courseTeams()
    {
        return $this->hasMany(CourseTeam::class, 'business_id');
    }

    public function bundles()
    {
        return $this->hasMany(Bundle::class);
    }

    // public function members()
    // {
    //     return $this->hasMany(BusinessMembers::class);
    // }
}
