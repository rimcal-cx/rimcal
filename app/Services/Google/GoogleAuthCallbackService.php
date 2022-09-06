<?php

namespace App\Services\Google;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;


class GoogleAuthCallbackService
{

    public function handle()
    {
        $gUser = Socialite::driver('google')->stateless()->user();
        $user = User::updateOrCreate([
            'google_id' => $gUser->id,
            'email' => $gUser->email,
        ], [
            'name' => $gUser->name,
            'email_verified_at' => now(),
            'password' => "",
            'remember_token' => "",
            'google_token' => $gUser->token,
            'google_refresh_token' => $gUser->refreshToken,
        ]);

        return Auth::login($user);

    }


}
