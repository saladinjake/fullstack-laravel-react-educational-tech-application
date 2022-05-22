<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'banner', 'article'
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class, 'blog_id');
    }
}
