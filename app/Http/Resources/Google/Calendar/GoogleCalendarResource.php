<?php

namespace App\Http\Resources\Google\Calendar;

use Illuminate\Http\Resources\Json\JsonResource;

class GoogleCalendarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'calendar_id' => $this->id,
            'summary' => $this->summary,
            'location' => $this->location,
            'description' => $this->description,
            'start_date' => explode('T', $this->start_datetime)[0],
            'end_date' => explode('T', $this->end_datetime)[0],
            'start_time' => explode('T', $this->start_datetime)[1],
            'end_time' => explode('T', $this->end_datetime)[1],
            'timezone' => $this->timezone,
            'remind_before_in_mins' => $this->remind_before_in_mins,
            'all_day' => $this->all_day,
            'attendees' => $this->attendees
        ];
    }
}
