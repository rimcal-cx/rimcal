<?php

namespace App\Services\Google;

use Laravel\Socialite\Facades\Socialite;

class GoogleAuthRedirectService
{

    public function handle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

}
