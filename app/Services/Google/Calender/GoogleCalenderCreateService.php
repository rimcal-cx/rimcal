<?php

namespace App\Services\Google\Calender;

use App\Services\Google\GoogleAuthClient;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;

class GoogleCalenderCreateService
{

    public function handle()
    {
        $client = (new GoogleAuthClient)->handle();
        $service = new Calendar($client);
        $event = new Event(array(
            'summary' => 'Google I/O 2015',
            'location' => '800 Howard St., San Francisco, CA 94103',
            'description' => 'A chance to hear more about Google\'s developer products.',
            'start' => array(
              'dateTime' => '2022-08-07T09:00:00-07:00',
              'timeZone' => 'America/Los_Angeles',
            ),
            'end' => array(
              'dateTime' => '2022-08-07T10:00:00-08:00',
              'timeZone' => 'America/Los_Angeles',
            ),
            'recurrence' => array(
              'RRULE:FREQ=DAILY;COUNT=2'
            ),
            'attendees' => array(
              array('email' => 'lpage@example.com'),
              array('email' => 'sbrin@example.com'),
            ),
            'reminders' => array(
              'useDefault' => FALSE,
              'overrides' => array(
                array('method' => 'email', 'minutes' => 24 * 60),
                array('method' => 'popup', 'minutes' => 10),
              ),
            ),
          ));

          $calendarId = 'primary';
          $event = $service->events->insert($calendarId, $event);

        dd($event);
    }
}
