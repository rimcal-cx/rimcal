<?php

namespace App\Http\Requests\Google\Calender;

use Illuminate\Foundation\Http\FormRequest;

class CalenderCreateRequest extends FormRequest
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
            'calender_id' => 'nullable|integer',
            'summary' => 'required|string',
            'location' => 'required|string',
            'description' => 'nullable|string',
            'start_datetime' => 'required|string',
            'end_datetime' => 'required|string',
            'timezone' => 'required|string',
            'attendees' => 'nullable|array',
            'remind_before_in_mins' => 'nullable|integer',
            'all_day' => 'required|boolean: true, false'
        ];
    }
}
