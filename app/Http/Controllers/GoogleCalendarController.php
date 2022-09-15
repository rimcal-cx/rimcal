<?php

namespace App\Http\Controllers;

use App\Services\Google\Calendar\GoogleCalendarCreateService;
use App\Http\Resources\Google\Calendar\GoogleCalendarResource;;
use App\Http\Requests\Google\Calendar\CalendarCreateRequest;
use App\Models\Calendar;
use App\Services\Google\Calendar\GoogleCalendarDeleteService;
use App\Services\Google\Calendar\GoogleCalendarListService;
use Illuminate\Http\Response;

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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Calendar $Calendar): Response
    {
        (new GoogleCalendarDeleteService())->handle($Calendar);
        return $this->response('Event deleted successfully', 200);
    }
}
