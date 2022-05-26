<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description',
    ];

    public function users()
    {
        return $this->belongsToMany('App\Models\User', 'user_certificates', 'certificate_id', 'user_id');
    }

    public function courses()
    {
        return $this->hasOne('App\Models\Course');
    }

}
