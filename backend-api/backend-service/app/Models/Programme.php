<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    use HasFactory;

    /**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name',
		'description',
        'certificate_title'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 
        'updated_at'
    ];

    public function courses()
    {
        return $this->belongsToMany('App\Models\Course', 'programme_courses', 'programme_id', 'course_id')->withPivot('programme_level_id');
    }

    public function programmeLevels()
    {
        return $this->hasMany(ProgrammeLevel::class, 'programme_id');
    }
}
