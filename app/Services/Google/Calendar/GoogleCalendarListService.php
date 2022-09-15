<?php

namespace App\Services\Google\Calendar;

use App\Models\Calendar;
use Illuminate\Support\Collection;

class GoogleCalendarListService
{

    public function handle(): Collection
    {
        return Calendar::whereUserId(auth()->user()->id)->with('attendees')->get();
    }

}
