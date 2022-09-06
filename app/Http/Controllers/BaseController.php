<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class BaseController
{
    private function response(string $provider): Response
    {
        return response(
            view('complete', [
                'json' => json_encode([
                    'status' => 'success',
                    'token' => auth()->user()->getRememberToken(),
                    'user' => auth()->user(),
                    'provider' => $provider,
                ])
            ])
        );
    }
}
