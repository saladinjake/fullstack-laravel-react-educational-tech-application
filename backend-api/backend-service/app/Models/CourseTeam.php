<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseTeam extends Model
{
    use HasFactory;

    protected $table = 'course_team';

    protected $fillable = [
      'business_id', 'course_id', 'member_id', 'revenue_type', 'total_revenue'
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
