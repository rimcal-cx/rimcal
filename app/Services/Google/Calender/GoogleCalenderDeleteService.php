<?php

namespace App\Services\Google\Calender;

use App\Models\Calender;
use App\Services\Google\GoogleAuthClient;
use Exception;
use Google\Service\Calendar\Calendar;
use Illuminate\Support\Facades\DB;

class GoogleCalenderDeleteService
{

    public function handle($calenderId)
    {
        try{
            DB::beginTransaction();
            $client = (new GoogleAuthClient)->handle();
            $service = new Calendar($client);
            $calender = Calender::find($calenderId);
            $service->events->delete('primary', $calender->event_id);
            Calender::whereId($calenderId)->delete();
            DB::commit();
            return true;
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

}
