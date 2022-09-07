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
            'email' => $gUser->email,
        ], [
            'name' => $gUser->name,
            'email_verified_at' => now(),
            'password' => "",
            'remember_token' => "",
            'google_id' => $gUser->id,
            'google_token' => $gUser->token,
            'google_refresh_token' => $gUser->refreshToken,
        ]);

        Auth::login($user);

        return Auth::user();

    }


}
