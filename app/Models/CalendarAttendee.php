<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CalendarAttendee extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'calendar_attendees';

    protected $fillable = [
        'id',
        'name',
        'calendar_id',
        'user_id',
        'email'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
}
