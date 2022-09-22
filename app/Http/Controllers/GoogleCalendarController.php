<?php

namespace App\Http\Controllers;

use App\Services\Google\Calendar\GoogleCalendarCreateService;
use App\Http\Requests\Google\Calendar\CalendarCreateRequest;
use Illuminate\Http\Response;
use App\Services\Google\Calendar\GoogleCalendarListService;
use App\Services\Google\Calendar\GoogleCalendarDeleteService;
use App\Http\Resources\Google\Calendar\GoogleCalendarResource;
use App\Models\Calendar;
use App\Services\Google\Calendar\GoogleCalendarEventListService;
use Illuminate\Http\Request;

class GoogleCalendarController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Response
    {
        $result = (new GoogleCalendarListService())->handle($request);
        return $this->response('Event added to Calendar', 200, ['events' => GoogleCalendarResource::collection($result)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Calendar $calendar
     * @return \Illuminate\Http\Response
     */
    public function destroy(Calendar $calendar): Response
    {
        (new GoogleCalendarDeleteService())->handle($calendar);
        return $this->response('Event deleted successfully', 200);
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
    public function googleEvents(Request $request): Response
    {
        (new GoogleCalendarEventListService())->handle($request);
        return $this->response('Events from google', 200);
    }

}
