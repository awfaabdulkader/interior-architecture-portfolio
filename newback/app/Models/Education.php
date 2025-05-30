<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'user_id',
        'year_start',
        'year_end',
        'diploma',
        'school',
    ];

    protected $casts = [
        'year_start' => 'date',
        'year_end' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
