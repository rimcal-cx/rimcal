<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Services\Google\GoogleAuthRedirectService;
use App\Services\Google\GoogleAuthCallbackService;

class GoogleAuthController extends BaseController
{

    public function redirect()
    {
        $result = (new GoogleAuthRedirectService())->handle();
        return response($result, 200);
    }

    public function callback()
    {
        $result = (new GoogleAuthCallbackService())->handle();
        return response($result, 200);
    }
}
