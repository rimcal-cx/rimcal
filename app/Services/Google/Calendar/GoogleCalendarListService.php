<?php

namespace App\Services\Google\Calendar;

use App\Models\Calendar;
use Illuminate\Support\Collection;

class GoogleCalendarListService
{

    public function handle($request): Collection
    {
        $start_datetime = \Carbon\Carbon::parse($request->start_date)->addHours(00)->addMinutes(00)->addSeconds(00)->format('Y-m-d H:i:s');
        $end_datetime = \Carbon\Carbon::parse($request->end_date)->addHours(23)->addMinutes(59)->addSeconds(59)->format('Y-m-d H:i:s');
        return Calendar::whereUserId(auth()->user()->id)->where('start_datetime', '>=' , $start_datetime)->where('end_datetime', '<=', $end_datetime)->with('attendees')->get();
    }

}
