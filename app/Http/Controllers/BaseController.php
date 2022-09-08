<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class BaseController
{
    public function response(string $message, string $status, array $data = [])
    {
        http_response_code($status);
        $result = array();
        $result['message'] = $message;
        $result['data'] = $data;

        return response($result)->withHeaders([
            'Content-Type' => 'application/json',
        ]);;
    }
}
