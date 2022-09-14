<?php

namespace App\Services\Google;

use Google\Client;
use App\Models\User;
use Exception;

class GoogleAuthClient
{

    public function handle(): object
    {
        $client = new Client();
        $client->setApplicationName('RimCal');
        $client->setScopes(['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/userinfo']);
        $client->setIncludeGrantedScopes(true);
        $authConfig = config('google_client_secret.secret');
        $client->setAuthConfig($authConfig);
        $client->setAccessType('offline');
        $client->setApprovalPrompt('force');// select_account consent
        $client->setPrompt('consent');
        $user = User::whereId(auth()->user()->id)->whereNotNull('google_id')->first();

        if(empty($user)){
            throw new Exception('Please login with google');
        }

        $client->setAccessToken($user->google_token);

        if ($client->isAccessTokenExpired()){
            if ($client->getRefreshToken()) {
                $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            } else {
                // $client->revokeToken($user->google_token);
                // $user = User::whereId(1)->update([
                //     'google_id' => '',
                //     'google_token' => '',
                //     'google_refresh_token' => ''
                // ]);
                // throw new Exception('Please Login');
            }
        }
        return $client;
    }

}
