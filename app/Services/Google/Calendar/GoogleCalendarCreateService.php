<?php

namespace App\Services\Google\Calendar;

use App\Models\Calendar;
use App\Models\CalendarAttendee;
use App\Services\Google\GoogleAuthClient;
use Exception;
use Google\Service\Calendar as GoogleCalendar;
use Google\Service\Calendar\Event;
use Illuminate\Support\Facades\DB;

class GoogleCalendarCreateService
{

    public function handle($request): Calendar
    {
        try{
            DB::beginTransaction();
            $client = (new GoogleAuthClient)->handle();
            $attendees = [];
            $calAttendees = [];

            $calendar = Calendar::updateOrCreate(
                [
                    'id' => $request->calendar_id,
                ],
                [
                    'user_id' => auth()->user()->id,
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

            if($request->calendar_id !== null){
                CalendarAttendee::whereCalendarId($request->calendar_id)->delete();
            }

            foreach($request->attendees as $attendee){
                $attendees[] = ['email' => $attendee['email']];
                $calAttendees[] = [
                    'calendar_id' => $calendar->id,
                    'user_id' => $attendee['id'],
                    'name' => $attendee['name'],
                    'email' => $attendee['email']
                ];
            };

            CalendarAttendee::insert($calAttendees);
            $event = $this->addToGoogleCalendar($client, $request, $attendees, $calendar);
            $calendar->event_id = $event->id;
            $calendar->save();
            DB::commit();
            return $calendar;
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }


    }

    private function addToGoogleCalendar($client, $request, $attendees, $localCalendar): Event
    {
        $service = new GoogleCalendar($client);

        if($request->calendar_id !== null){
            $service->events->delete('primary', $localCalendar->event_id);
        }
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
        return $event;
    }
}
