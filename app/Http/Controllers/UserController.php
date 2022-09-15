<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    public function index(): Response
    {
        return $this->response('Attendees list', 200, User::$defaultUserAttendees);
    }
}
