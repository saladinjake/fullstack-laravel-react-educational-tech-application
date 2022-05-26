<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class BusinessMember extends BaseModel
{
	use HasFactory;
	
	protected $guarded;

    // protected $fillable = [
	// 	'staff_no', 'job_designation', 'status'
	// ];

	/**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'status'
    ];

    public function business()
    {
        return $this->belongsTo(BusinessProfile::class, 'business_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // public function members()
    // {
    //     return $this->belongsToMany('App\Models\User', 'business_members', 'business_id', 'member_id')->withPivot('staff_no', 'job_designation', 'status')->withTimestamps();
    // }
}
