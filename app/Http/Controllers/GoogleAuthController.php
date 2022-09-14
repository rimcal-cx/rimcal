<?php

namespace App\Http\Controllers;

use App\Services\Google\GoogleAuthRedirectService;
use App\Services\Google\GoogleAuthCallbackService;
use App\Services\Google\GoogleAuthRevokeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class GoogleAuthController extends BaseController
{

    public function redirect(): RedirectResponse
    {
        return (new GoogleAuthRedirectService())->handle();
        //return $this->response('Google redirection successfull', 200, ['redirect_url' => $result->headers->get('Location')]);
    }

    public function callback(): Response
    {
        $result = (new GoogleAuthCallbackService())->handle();
        return $this->response('Login successfull', 200, ['user' => $result]);
    }

    public function logout(): Response
    {
        (new GoogleAuthRevokeService())->handle();
        return $this->response('Logout successfull', 200);
    }
}
