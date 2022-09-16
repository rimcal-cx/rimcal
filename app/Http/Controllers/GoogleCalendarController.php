<?php

namespace App\Http\Controllers;

use App\Services\Google\Calendar\GoogleCalendarCreateService;
use App\Http\Resources\Google\Calendar\GoogleCalendarResource;;
use App\Http\Requests\Google\Calendar\CalendarCreateRequest;
use App\Models\Calendar;
use App\Services\Google\Calendar\GoogleCalendarDeleteService;
use App\Services\Google\Calendar\GoogleCalendarListService;
use Illuminate\Http\JsonResponse;
use App\Services\Google\Calendar\GoogleCalendarSyncService;
use Illuminate\Http\Request;
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
        return $this->response('Event added to calendar', 200, ['event' => new GoogleCalendarResource($result)]);
        // return response()->json([
        //     'data' => [
        //         'message' => 'Event added to calendar',
        //         'event' => new GoogleCalendarResource($result)
        //     ]
        // ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($calendarId): Response
    {
        (new GoogleCalendarDeleteService())->handle($calendarId);
        return $this->response('Event deleted successfully', 200);
    }

    public function sync(Request $request): Response
    {
        (new GoogleCalendarSyncService())->handle($request);
        return $this->response('Synced successfully', 200);
    }
}
