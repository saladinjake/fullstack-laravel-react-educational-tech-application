<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends BaseModel
{
    use HasFactory, SoftDeletes;

    /**
	 * Protect $dates
	 *
	 * @var array
	 */
	protected $dates = [
		'created_at',
        'updated_at',
        'deleted_at'
	];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name',
		'parent_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    // one level of subcategory
    public function subcategories()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    // All levels of nested subcategories
    // public function childrenSubcategories()
    // {
    //     return $this->hasMany(Category::class, 'parent_id')->with('subcategories');
    // }
}
