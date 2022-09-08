<?php

namespace App\Services\Google\Calender;

use App\Models\Calender;

class GoogleCalenderListService
{

    public function handle()
    {
        return Calender::whereUserId(1)->with('attendees')->get();
    }

}
