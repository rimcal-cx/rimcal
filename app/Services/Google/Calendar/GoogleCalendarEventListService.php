<?php

namespace App\Services\Google\Calendar;

use App\Models\Calendar;
use App\Models\CalendarAttendee;
use App\Models\User;
use App\Services\Google\GoogleAuthClient;
use Google\Service\Calendar as GoogleCalendar;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class GoogleCalendarEventListService
{

    public function handle(Request $request)
    {
        try {
            DB::beginTransaction();
            $client = (new GoogleAuthClient)->handle();
            $service = new GoogleCalendar($client);

            $params = [
                'timeMin' => $request->start_date."T00:00:00Z", // start time of the first day of the current month
                'timeMax' => $request->end_date."T23:59:59Z",  // end time of the last day of the current month
            ];

            $start_datetime = \Carbon\Carbon::parse($request->start_date)->addHours(00)->addMinutes(00)->addSeconds(00)->format('Y-m-d H:i:s');
            $end_datetime = \Carbon\Carbon::parse($request->end_date)->addHours(23)->addMinutes(59)->addSeconds(59)->format('Y-m-d H:i:s');

            $events = $service->events->listEvents('primary', $params);
            $existingEventIds = [];

            $users = User::all();
            $emails = $users->keyBy('email');

            foreach($events as $event) {
                $existingEventIds[] = $event->id;
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
                    if($emails->has($attendeeEmail)) {
                        $currentAttendeesEmails[] = $attendeeEmail;
                        if (!in_array($attendeeEmail, $alreadyPresentAttendeesEmails)) {
                            $attendeeInfo = $users->first(function ($user) use($attendeeEmail) {
                                return $user->email === $attendeeEmail;
                            });
                            CalendarAttendee::create([
                                'calendar_id' => $calendar->id,
                                'user_id' => $attendeeInfo->id,
                                'name' => $attendeeInfo->name,
                                'email' => $attendeeInfo->email
                            ]);
                        }
                    }
                }
                CalendarAttendee::whereCalendarId($calendar->id)->whereNotIn('email', $currentAttendeesEmails)->delete();
            }

            $eventsRemovedFromGCal = Calendar::whereNotIn('event_id', $existingEventIds)
                    ->where('start_datetime', '>=' , $start_datetime)
                    ->where('end_datetime', '<=', $end_datetime);
            $eventsRemovedFromGCalId = collect($eventsRemovedFromGCal)->pluck('calendar_id')->toArray();
            CalendarAttendee::whereIn('calendar_id', $eventsRemovedFromGCalId)->delete();
            $eventsRemovedFromGCal->delete();
            DB::commit();
            return true;
        } catch(\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

}
