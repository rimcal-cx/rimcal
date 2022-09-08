<?php

namespace App\Http\Controllers;

use App\Services\Google\GoogleAuthRedirectService;
use App\Services\Google\GoogleAuthCallbackService;

class GoogleAuthController extends BaseController
{

    public function redirect()
    {
        $result = (new GoogleAuthRedirectService())->handle();
        return $this->response('Google redirection successfull', 200, ['redirect_url' => $result->headers->get('Location')]);
    }

    public function callback()
    {
        $result = (new GoogleAuthCallbackService())->handle();
        return $this->response('Login successfull', 200, ['user' => $result]);
    }
}
