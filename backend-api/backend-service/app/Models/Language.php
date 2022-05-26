<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    /**
	 * Protect $dates
	 *
	 * @var array
	 */
	protected $dates = [
		'created_at',
		'updated_at'
	];

	/**
	 * he attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'alpha3',
		'alpha2',
		'english',
	];

	/**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

  public function courses()
  {
      return $this->hasMany(Course::class);
  }

}
