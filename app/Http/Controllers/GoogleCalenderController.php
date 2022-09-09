<?php

namespace App\Http\Controllers;

use App\Services\Google\Calender\GoogleCalenderCreateService;
use App\Http\Resources\Google\Calender\GoogleCalenderResource;;
use App\Http\Requests\Google\Calender\CalenderCreateRequest;
use App\Models\Calender;
use App\Services\Google\Calender\GoogleCalenderDeleteService;
use App\Services\Google\Calender\GoogleCalenderListService;

class GoogleCalenderController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = (new GoogleCalenderListService())->handle();
        return $this->response('Event added to calender', 200, ['events' => GoogleCalenderResource::collection($result)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(CalenderCreateRequest $request)
    {
        $result = (new GoogleCalenderCreateService())->handle($request);
        return $this->response('Event added to calender', 200, ['event' => new GoogleCalenderResource($result)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Calender $calender)
    {
        (new GoogleCalenderDeleteService())->handle($calender);
        return $this->response('Event deleted successfully', 200);
    }
}
