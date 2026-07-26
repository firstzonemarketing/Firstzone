<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'content',
        'featured_image',
        'gallery_images',
        'category',
        'tags',
        'author',
        'publish_date',
        'reading_time',
        'seo_title',
        'seo_description',
        'keywords',
        'status',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'tags' => 'array',
        'publish_date' => 'date:Y-m-d',
    ];
}
