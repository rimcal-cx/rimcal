<?php

namespace App\Services\Google;

use Google\Client;
use App\Models\User;
use Exception;
use Google_Service_Calendar;

class GoogleAuthClient
{

    public function handle()
    {
        $client = new Client();
        $client->setApplicationName('RimCal');
        $client->setScopes(['https://www.googleapis.com/auth/calendar']);
        $client->setIncludeGrantedScopes(true);
        $client->setAuthConfig(storage_path('api/google_client_secret.json'));
        $client->setAccessType('offline');
        $client->setApprovalPrompt('force');// select_account consent
        $client->setPrompt('consent');
        $user = User::whereId(1)->whereNotNull('google_id')->first();

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
