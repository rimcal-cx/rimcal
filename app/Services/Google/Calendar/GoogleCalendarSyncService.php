<?php

namespace App\Services\Google\Calendar;

use App\Models\Calendar;
use App\Models\CalendarAttendee;
use App\Models\User;
use App\Services\Google\GoogleAuthClient;
use Exception;
use Google\Service\Calendar as GoogleCalendar;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class GoogleCalendarSyncService
{

    public function handle($request): bool
    {
        try{
            DB::beginTransaction();
            $client = (new GoogleAuthClient)->handle();
            $service = new GoogleCalendar($client);
            $events = $service->events->listEvents('primary');
            // $pageToken = $events->getNextPageToken();
                // if ($pageToken) {
                    $optParams = array(
                        // 'pageToken' => $pageToken,
                        'timeMin' => $request->start_date."T00:00:00Z", // start time of the first day of the current month
                        'timeMax' => $request->end_date."T23:59:59Z",  // end time of the last day of the current month
                    );
                    $events = $service->events->listEvents('primary', $optParams);

                    foreach($events as $event){
                        if ($calendar = Calendar::where('event_id', $event->id)->first()) {
                                $calendar->update([
                                'user_id' => auth()->user()->id,
                                'summary' => $event->summary,
                                'description' => $event->description,
                                'location' => $event->location ?? $event->start?->timeZone ? \Str::of($event->start->timeZone)->after('/')->replace('_', ' ') : null,
                                'start_datetime' => $event->start ? $event->start->dateTime : "00-00-00T00:00:00",
                                'end_datetime' => $event->end ? $event->end->dateTime : "00-00-00T00:00:00",
                                'timezone' => $event->start ? $event->start->timeZone : "",
                                'remind_before_in_mins' => $event->reminders?->useDefault ? 10 : 0,
                            ]);
                        } else {
                            $calendar = Calendar::create([
                                'user_id' => auth()->user()->id,
                                'event_id' => $event->id,
                                'summary' => $event->summary,
                                'description' => $event->description,
                                'location' => $event->location ?? $event->start?->timeZone ? \Str::of($event->start->timeZone)->after('/')->replace('_', ' ') : null,
                                'start_datetime' => $event->start ? $event->start->dateTime : "00-00-00T00:00:00",
                                'end_datetime' => $event->end ? $event->end->dateTime : "00-00-00T00:00:00",
                                'timezone' => $event->start ? $event->start->timeZone : "",
                                'remind_before_in_mins' => $event->reminders?->useDefault ? 10 : 0,
                                'all_day' => false,
                                'event_label' => Arr::random(Calendar::$labels),
                            ]);
                        }

                        $alreadyPresentAttendees = CalendarAttendee::whereCalendarId($calendar->id)->get();
                        $alreadyPresentAttendeesEmails = collect($alreadyPresentAttendees)->pluck('email')->all();
                        $currentAttendeesEmails = [];
                        foreach($event->attendees as $attendee) {
                            $attendeeEmail = trim($attendee->email);
                            if(
                                in_array($attendeeEmail, array_column(User::$defaultUserAttendees, 'email'))
                            ) {
                                $currentAttendeesEmails[] = $attendeeEmail;
                                if (!in_array($attendeeEmail, $alreadyPresentAttendeesEmails)) {
                                    $attendeeInfo = User::whereEmail($attendeeEmail)->first();
                                    CalendarAttendee::create([
                                        'calendar_id' => $calendar->id,
                                        'user_id' => $attendeeInfo->id,
                                        'name' => $attendeeInfo->name,
                                        'email' => $attendeeInfo->email
                                    ]);
                                }
                            }
                        }
                        $attendeesRemoved = array_diff($alreadyPresentAttendeesEmails, $currentAttendeesEmails);
                        if (!empty($attendeesRemoved)) {
                            Calendar::whereCalendarId($calendar->id)->whereIn('email', $attendeesRemoved)->delete();
                        }
                    }
                // }
            DB::commit();
            return true;
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

}
