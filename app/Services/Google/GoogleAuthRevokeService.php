<?php

namespace App\Services\Google;


class GoogleAuthRevokeService
{

    public function handle(): bool
    {
        $client = (new GoogleAuthClient())->handle();
        $client->revokeToken(auth()->user()->google_token);
        auth()->user()->currentAccessToken()->delete();
        return true;
    }

}
