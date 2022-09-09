<?php

namespace App\Services\Google\Calender;

use App\Models\Calender;
use App\Services\Google\GoogleAuthClient;
use Exception;
use Google\Service\Calendar\Calendar as GoogleCalender;
use Illuminate\Support\Facades\DB;

class GoogleCalenderDeleteService
{

    public function handle(Calender $calender): bool
    {
        try{
            DB::beginTransaction();
            $client = (new GoogleAuthClient)->handle();
            $service = new GoogleCalender($client);
            $service->events->delete('primary', $calender->event_id);
            $calender->attendees()->delete();
            $calender->delete();
            DB::commit();
            return true;
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

}
