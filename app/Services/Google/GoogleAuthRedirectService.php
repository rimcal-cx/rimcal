<?php

namespace App\Services\Google;

use Laravel\Socialite\Facades\Socialite;

class GoogleAuthRedirectService
{

    public function handle()
    {
        return Socialite::driver('google')->scopes(['https://www.googleapis.com/auth/calendar'])->stateless()->redirect();
    }

}
