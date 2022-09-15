<?php

namespace App\Services\Google;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class GoogleAuthCallbackService
{

    public function handle(): User
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

        $token_expiry = config('sanctum.expiration', null) !== null ? \Carbon\Carbon::now()->addMinutes(config('sanctum.expiration')) : null;

        $user->token = $user->createToken("Rimcal", ['*'], $token_expiry)->plainTextToken;
        $user->token_expiry = $token_expiry;

        return $user;
    }


}
