<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory;

    protected $table = "curriculums";

    protected $fillable = [
        'course_id', 'topic', 'parent_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id', 'course_id', 'created_at', 'updated_at'
    ];

    public function subtopics()
    {
        return $this->hasMany(Curriculum::class, 'parent_id');
    }

    public function courses()
    {
        return $this->belongsTo(Course::class);
    }

}
