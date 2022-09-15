<?php

namespace App\Http\Controllers;

use App\Services\Google\GoogleAuthRedirectService;
use App\Services\Google\GoogleAuthCallbackService;
use App\Services\Google\GoogleAuthRevokeService;
use Illuminate\Http\JsonResponse;
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
        $user = (new GoogleAuthCallbackService())->handle();
        return response(
            view('complete', [
                'json' => json_encode([
                    'status' => 'success',
                    'user' => $user,
                    'token' => $user->token,
                    'expiresIn' => $user->token_expiry,
                    'provider' => 'google'
                ])
            ])
        )->cookie('token', $user->token, 0);
    }

    public function me(): JsonResponse
    {
        return response()->json([
            "data" => auth()->user()
        ]);
    }

    public function logout(): Response
    {
        (new GoogleAuthRevokeService())->handle();
        return $this->response('Logout successfull', 200);
    }
}
