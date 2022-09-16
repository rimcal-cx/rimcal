<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use Illuminate\Http\Response;
use App\Services\Google\Calendar\GoogleCalendarListService;
use App\Http\Requests\Google\Calendar\CalendarCreateRequest;
use App\Services\Google\Calendar\GoogleCalendarCreateService;
use App\Services\Google\Calendar\GoogleCalendarDeleteService;
use App\Http\Resources\Google\Calendar\GoogleCalendarResource;;
use App\Services\Google\Calendar\GoogleCalendarEventListService;

class GoogleCalendarController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response
    {
        $result = (new GoogleCalendarListService())->handle();
        return $this->response('Event added to Calendar', 200, ['events' => GoogleCalendarResource::collection($result)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(CalendarCreateRequest $request): Response
    {
        $result = (new GoogleCalendarCreateService())->handle($request);
        return $this->response('Event added to Calendar', 200, ['event' => new GoogleCalendarResource($result)]);
    }

    /**
     * Fetch events from google calendar.
     *
     * @return \Illuminate\Http\Response
     */
    public function googleEvents(): Response
    {
        $result = (new GoogleCalendarEventListService())->handle();
        return $this->response('Events from google', 200, ['event' => $result]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Calendar $calendar): Response
    {
        (new GoogleCalendarDeleteService())->handle($calendar);
        return $this->response('Event deleted successfully', 200);
    }
}
