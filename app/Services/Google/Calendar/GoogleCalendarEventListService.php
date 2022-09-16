<?php

namespace App\Services\Google\Calendar;

use App\Models\Calendar;
use Illuminate\Support\Collection;
use App\Services\Google\GoogleAuthClient;
use Google\Service\Calendar as GoogleCalendar;

class GoogleCalendarEventListService
{

    public function handle()
    {
        $client = (new GoogleAuthClient)->handle();
        $service = new GoogleCalendar($client);

        $events = $service->events->listEvents('primary');
        return $events;
    }

}
