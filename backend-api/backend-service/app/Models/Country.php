<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /**
	 * Protect $dates
	 *
	 * @var array
	 */
	protected $dates = [
		'created_at',
		'updated_at'
    ];
    
    protected $fillable = [
        'iso', 'name', 'nicename', 'iso3', 'numcode', 'phonecode',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y h:i:s');
    }

    public function getUpdatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y h:i:s');
    }

    public function businessProfile()
    {
        return $this->hasOne(BusinessProfile::class);
    }
}
