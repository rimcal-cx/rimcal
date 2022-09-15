<?php

namespace App\Services\Google\Calendar;

use App\Models\Calendar;
use App\Services\Google\GoogleAuthClient;
use Exception;
use Google\Service\Calendar\Calendar as GoogleCalendar;
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
            $calendar->attendees()->delete();
            $calendar->delete();
            DB::commit();
            return true;
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

}
