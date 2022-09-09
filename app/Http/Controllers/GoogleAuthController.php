<?php

namespace App\Http\Controllers;

use App\Services\Google\GoogleAuthRedirectService;
use App\Services\Google\GoogleAuthCallbackService;
use App\Services\Google\GoogleAuthRevokeService;

class GoogleAuthController extends BaseController
{

    public function redirect()
    {
        return (new GoogleAuthRedirectService())->handle();
        // return $this->response('Google redirection successfull', 200, ['redirect_url' => $result->headers->get('Location')]);
    }

    public function callback()
    {
        $result = (new GoogleAuthCallbackService())->handle();
        return $this->response('Login successfull', 200, ['user' => $result]);
    }

    public function logout()
    {
        $result = (new GoogleAuthRevokeService())->handle();
        return $this->response('Logout successfull', 200);
    }
}
