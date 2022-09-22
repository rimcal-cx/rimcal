<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Response;

class UserController extends BaseController
{
    public function index(): Response
    {
        return $this->response('Attendees list', 200, User::all()->toArray());
    }
}
