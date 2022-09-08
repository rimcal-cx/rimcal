<?php

namespace App\Services\Google\Calender;

use App\Models\Calender;
use App\Models\CalenderAttendee;
use App\Services\Google\GoogleAuthClient;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;

class GoogleCalenderCreateService
{

    public function handle($request)
    {
        $client = (new GoogleAuthClient)->handle();
        $attendees = [];

        $calender = Calender::updateOrCreate(
            [
                'id' => $request->calender_id,
            ],
            [
                'summary' => $request->summary,
                'location' => $request->location,
                'description' => $request->description,
                'start_datetime' => $request->start_datetime,
                'end_datetime' => $request->end_datetime,
                'timezone' => $request->timezone,
                'remind_before_in_mins' => $request->remind_before_in_mins,
                'all_day' => $request->all_day
            ]
        );

        foreach($request->attendees as $attendee){
            $attendees[] = ['email' => $attendee];
            $calAttendees[] = [
                'calender_id' => $calender->id,
                'user_id' => null,
                'email' => $attendee
            ];
        };

        CalenderAttendee::insert($calAttendees);
        $this->addToGoogleCalender($client, $request, $attendees);
        return $calender;

    }

    private function addToGoogleCalender($client, $request, $attendees)
    {
        $service = new Calendar($client);

        $event = new Event(array(
            'summary' => $request->summary,
            'location' => $request->location,
            'description' => $request->description,
            'start' => array(
              'dateTime' => $request->start_datetime,
              'timeZone' => $request->timezone,
            ),
            'end' => array(
              'dateTime' => $request->end_datetime,
              'timeZone' => $request->timezone,
            ),
            'attendees' => $attendees,
            'reminders' => array(
              'useDefault' => FALSE,
              'overrides' => array(
                array('method' => 'email', 'minutes' => 24 * 60),
                array('method' => 'popup', 'minutes' => $request->remind_before_in_mins),
              ),
            ),
          ));

          $calendarId = 'primary';
          $event = $service->events->insert($calendarId, $event);

        return true;
    }
}
