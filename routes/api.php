<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\GoogleCalenderController;

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

Route::group(['prefix' => 'google', 'middleware' => ['web']], function(){
    Route::get('/redirect', [GoogleAuthController::class, 'redirect']);
    Route::get('/callback', [GoogleAuthController::class, 'callback']);
});
Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::group(['prefix' => 'calender'], function () {
        Route::apiResource('/', GoogleCalenderController::class, ['except' => ['store, update, show'], 'only' => ['index', 'destroy']]);
        Route::post('/add', [GoogleCalenderController::class, 'create']);
    });
    Route::post('/google/logout', [GoogleAuthController::class, 'logout']);
});
