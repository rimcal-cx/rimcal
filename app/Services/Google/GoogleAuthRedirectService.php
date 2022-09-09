<?php

namespace App\Services\Google;

use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthRedirectService
{

    public function handle(): RedirectResponse
    {
        return Socialite::driver('google')->scopes(['https://www.googleapis.com/auth/calendar'])->stateless()->redirect();
    }

}
