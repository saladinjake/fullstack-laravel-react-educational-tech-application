<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bundle extends Model
{
    use HasFactory;

    protected $fillable = [
        'instructor_id', 'business_id', 'name', 'slug', 'description', 'discountIncrease', 'price', 'status'
    ];

    public function instructor()
    {
        return $this->belongsTo(InstructorProfile::class);
    }
    public function business()
    {
        return $this->belongsTo(BusinessProfile::class);
    }

    public function courses()
    {
        return $this->belongsToMany('App\Models\Course', 'bundle_courses', 'bundle_id', 'course_id');
    }
}
