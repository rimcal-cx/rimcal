<?php

namespace App\Services\Google;

use Laravel\Socialite\Facades\Socialite;

class GoogleAuthRedirectService
{

    public function handle(): object
    {
        return Socialite::driver('google')->scopes(['https://www.googleapis.com/auth/calendar'])->stateless()->redirect();
    }

}
