<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\GoogleCalendarController;
use App\Http\Controllers\UserController;

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
    Route::get('/me', [GoogleAuthController::class, 'me']);
    Route::group(['prefix' => 'calendar'], function () {
        Route::apiResource('/', GoogleCalendarController::class, ['except' => ['store, update, show', 'destroy'], 'only' => ['index']]);
        Route::post('/add', [GoogleCalendarController::class, 'create']);
        Route::post('/sync', [GoogleCalendarController::class, 'sync']);
    });
    Route::get('/users', [UserController::class, 'index']);
});
