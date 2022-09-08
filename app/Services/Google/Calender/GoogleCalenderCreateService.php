<?php

namespace App\Services\Google\Calender;

use App\Models\Calender;
use App\Models\CalenderAttendee;
use App\Services\Google\GoogleAuthClient;
use Exception;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Illuminate\Support\Facades\DB;

class GoogleCalenderCreateService
{

    public function handle($request)
    {
        try{
            DB::beginTransaction();
            $client = (new GoogleAuthClient)->handle();
            $attendees = [];

            $calender = Calender::updateOrCreate(
                [
                    'id' => $request->calender_id,
                ],
                [
                    'user_id' => 1,
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

            if($request->calender_id !== null){
                CalenderAttendee::whereCalenderId($request->calender_id)->delete();
            }

            foreach($request->attendees as $attendee){
                $attendees[] = ['email' => $attendee];
                $calAttendees[] = [
                    'calender_id' => $calender->id,
                    'user_id' => null,
                    'email' => $attendee
                ];
            };

            CalenderAttendee::insert($calAttendees);
            $event = $this->addToGoogleCalender($client, $request, $attendees, $calender);
            $calender->event_id = $event->id;
            $calender->save();
            DB::commit();
            return $calender;
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }


    }

    private function addToGoogleCalender($client, $request, $attendees, $localCalender)
    {
        $service = new Calendar($client);

        if($request->calender_id !== null){
            $service->events->delete('primary', $localCalender->event_id);
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
