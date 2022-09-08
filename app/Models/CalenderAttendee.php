<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CalenderAttendee extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'calender_attendees';

    protected $fillable = [
        'id',
        'calender_id',
        'user_id',
        'email'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
}
