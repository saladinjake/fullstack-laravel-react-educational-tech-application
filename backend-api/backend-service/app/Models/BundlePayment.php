<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BundlePayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'learner_profile_id', 'business_profile_id', 'bundle_id', 'price', 'payment_reference', 'status'
    ];

    public function learnerProfile(){
        return $this->belongsTo(LearnerProfile::class);
    }

    public function businessProfile(){
        return $this->belongsTo(BusinessProfile::class);
    }

    public function bundles(){
        return $this->belongsTo(Bundle::class);
    }
}
