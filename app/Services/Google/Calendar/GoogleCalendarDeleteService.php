<?php

namespace App\Services\Google\Calendar;

use App\Models\Calendar;
use App\Models\CalendarAttendee;
use App\Services\Google\GoogleAuthClient;
use Exception;
use Google\Service\Calendar as GoogleCalendar;
use Illuminate\Support\Facades\DB;

class GoogleCalendarDeleteService
{

    public function handle(Calendar $calendar): bool
    {
        try{
            DB::beginTransaction();
            $client = (new GoogleAuthClient)->handle();
            $service = new GoogleCalendar($client);
            $service->events->delete('primary', $calendar->event_id);
            CalendarAttendee::where('calendar_id', $calendar->id)->delete();
            $calendar->delete();
            DB::commit();
            return true;
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

}
