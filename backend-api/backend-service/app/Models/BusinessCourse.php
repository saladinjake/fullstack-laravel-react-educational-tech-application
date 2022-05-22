<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class BusinessCourse extends BaseModel
{
    use HasFactory;

    protected $table = 'business_course_enrolled';

    protected $guarded;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'status'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function business()
    {
        return $this->belongsTo(BusinessProfile::class, 'business_id');
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class, 'subscription_id');
    }
    


}
