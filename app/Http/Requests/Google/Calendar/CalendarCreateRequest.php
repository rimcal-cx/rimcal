<?php

namespace App\Http\Requests\Google\Calendar;

use Illuminate\Foundation\Http\FormRequest;

class CalendarCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'calendar_id' => 'nullable|integer',
            'summary' => 'required|string',
            'location' => 'required|string',
            'description' => 'nullable|string',
            'start_datetime' => 'required|string',
            'end_datetime' => 'required|string',
            'timezone' => 'required|string',
            'attendees' => 'min:1|array',
            'attendees.*.id' => 'required|integer',
            'attendees.*.name' => 'required|string',
            'attendees.*.email' => 'required|string',
            'remind_before_in_mins' => 'nullable|integer',
            'event_label' => 'nullable|string',
        ];
    }
}
