<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Calender extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'calenders';

    protected $fillable = [
        'id',
        'user_id',
        'event_id',
        'summary',
        'location',
        'description',
        'start_datetime',
        'end_datetime',
        'timezone',
        'remind_before_in_mins',
        'all_day'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $cast = [
        'all_day' => 'boolean'
    ];

    public function attendees(){
        $this->hasMany(CalenderAttendee::class, 'calender_id', 'id');
    }
}