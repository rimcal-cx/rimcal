<?php

namespace App\Services\Google\Calendar;

use App\Services\Google\GoogleAuthClient;
use Google\Service\Calendar as GoogleCalendar;

class GoogleCalendarEventListService
{

    public function handle()
    {
        $client = (new GoogleAuthClient)->handle();
        $service = new GoogleCalendar($client);

        $params = [
            'timeMin' => date('Y-m-01T00:00:00Z'), // start time of the first day of the current month
            'timeMax' => date('Y-m-tT12:59:59Z'),  // end time of the last day of the current month
        ];

        $events = $service->events->listEvents('primary', $params);
        return $events;
    }

}
