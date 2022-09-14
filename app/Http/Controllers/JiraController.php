<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Unirest\Request as URequest;

class JiraController extends BaseController
{
    public function index()
    {
        URequest::auth('somsubhra@rimsys.io', 'hX6wpQte0UUlY5LexuiV1482');

        $headers = array(
            'Accept' => 'application/json'
        );

        $query = array(
            'jql' => 'project = R5'
        );

        $response = URequest::get(
            //'https://rimsys.atlassian.net/rest/api/2/issue/10037',
            'https://rimsys.atlassian.net/rest/api/2/search',
            $headers,
            $query
        );

        echo '<pre>';
        print_r($response);
        echo '</pre>';
    }

    public function issues()
    {
        URequest::auth('somsubhra@rimsys.io', 'hX6wpQte0UUlY5LexuiV1482');

        $headers = array(
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        );

        $body = [
            "expand" => [
                "names",
                "schema",
                "operations"
            ],
            "jql" => "project = R5",
            "maxResults" => 15,
            "fieldsByKeys" => false,
            "fields" => [
                "summary",
                "status",
                "assignee"
            ],
            "startAt" => 0
        ];
        $jsonBody = json_encode($body);

        $response = URequest::post(
            'https://rimsys.atlassian.net/rest/api/2/search',
            $headers,
            $jsonBody
        );

        echo '<pre>';
        print_r($response);
        echo '</pre>';
    }
}
