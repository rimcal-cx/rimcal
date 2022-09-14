<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\GoogleCalenderController;
use App\Http\Controllers\JiraController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'google'], function(){
    Route::get('/redirect', [GoogleAuthController::class, 'redirect']);
    Route::get('/callback', [GoogleAuthController::class, 'callback']);
    Route::post('/logout', [GoogleAuthController::class, 'logout'])->middleware('auth:sanctum');
});


Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::group(['prefix' => 'calender'], function () {
        Route::apiResource('/', GoogleCalenderController::class, ['except' => ['store, update, show'], 'only' => ['index', 'destroy']]);
        Route::post('/add', [GoogleCalenderController::class, 'create']);
    });
});

/*Route::group(['prefix' => 'jira'], function(){
    Route::post('/issues', [JiraController::class, 'issues']);

    // Beloe both lines are working
    //Route::apiResource('/', JiraController::class)->except(['store', 'destroy', 'update', 'show']);
    Route::get('/', [JiraController::class, 'index']);
});*/

Route::get('/jira/', [JiraController::class, 'index']);
Route::post('/jira/issues', [JiraController::class, 'issues']);
