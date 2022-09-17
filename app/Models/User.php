<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'remember_token',
        'email_verified_at',
        'google_id',
        'google_token',
        'google_refresh_token'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static array $defaultUserAttendees = [
        [
            'name' => 'Khandkar Ujairul Islam',
            'email' => 'ujairul@rimsys.io'
        ],
        [
            'name' => 'Somsubhra Saha',
            'email' => 'somsubhra@rimsys.io'
        ],
        [
            'name' => 'Tarun Adhikary',
            'email' => 'tarun@rimsys.io'
        ],
        [
            'name' => 'Amit Kadam',
            'email' => 'amit.kadam@rimsys.io'
        ],
        [
            'name' => 'Surajit Sadhukhan',
            'email' => 'surajit@rimsys.io'
        ],
    ];
}
