<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends BaseModel
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'status'
    ];

    /**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	// protected $fillable = [
	// 	'user_id', 'course_id', 'business_profile_id', 'reference', 'amount', 'status'
    // ];

    protected $guarded;

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function business()
    {
        return $this->belongsTo(BusinessProfile::class, 'business_profile_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
