<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Calendar extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'calendars';

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
        'all_day',
        'event_label',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $cast = [
        'all_day' => 'boolean'
    ];

    public static array $labels = ["lime", "red", "green", "gray", "blue", "purple"];

    public function attendees(){
        return $this->hasManyThrough(User::class, CalendarAttendee::class, 'calendar_id', 'id', 'id', 'user_id');
    }
}
