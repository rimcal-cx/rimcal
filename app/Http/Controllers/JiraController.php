<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Unirest\Request as URequest;

class JiraController extends BaseController
{
    public function index()
    {
        URequest::auth('somsubhra@rimsys.io', 'uoJAc237gxtVnA3pDa1t19FC');

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

    public function sprints()
    {
        //URequest::auth('somsubhra@rimsys.io', 'uoJAc237gxtVnA3pDa1t19FC');

        //echo $auth = 'uoJAc237gxtVnA3pDa1t19FC';
        //echo $auth = "somsubhra@rimsys.io" . ":" . "uoJAc237gxtVnA3pDa1t19FC";
        echo $auth = base64_encode("somsubhra@rimsys.io" . ":" . "uoJAc237gxtVnA3pDa1t19FC");
        $headers = array(
            'Accept' => 'application/json',
            //'Content-Type' => 'application/json'
            'Authorization' => 'Bearer ' . $auth
        );

        /*$body = [
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
        $jsonBody = json_encode($body);*/

        $response = URequest::get(
            //'https://rimsys.atlassian.net/rest/api/2/search',
            'https://rimsys.atlassian.net/rest/agile/1.0/board/34/sprint',
            $headers
            //$jsonBody
        );

        echo '<pre>';
        print_r($response);
        echo '</pre>';
    }

    public function issues()
    {
        //URequest::auth('somsubhra@rimsys.io', 'uoJAc237gxtVnA3pDa1t19FC');

        $headers = array(
            'Accept' => 'application/json',
            //'Content-Type' => 'application/json'
            'Authorization' => 'Bearer uoJAc237gxtVnA3pDa1t19FC'
        );

        /*$body = [
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
        $jsonBody = json_encode($body);*/

        $response = URequest::get(
            //'https://rimsys.atlassian.net/rest/api/2/search',
            'https://rimsys.atlassian.net/rest/agile/1.0/sprint/34/issue',
            $headers,
            //$jsonBody
        );

        echo '<pre>';
        print_r($response);
        echo '</pre>';
    }
}
