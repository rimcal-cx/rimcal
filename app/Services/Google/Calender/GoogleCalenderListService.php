<?php

namespace App\Services\Google\Calender;

use App\Models\Calender;
use Illuminate\Support\Collection;

class GoogleCalenderListService
{

    public function handle(): Collection
    {
        return Calender::whereUserId(auth()->user()->id)->with('attendees')->get();
    }

}
