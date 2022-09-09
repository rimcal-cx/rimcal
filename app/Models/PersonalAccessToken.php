<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    use SoftDeletes;
    protected $table = "personal_access_tokens";

    protected $fillable = [
        'name',
        'token',
        'abilities',
        'expires_at',
    ];
}
