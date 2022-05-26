<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::get('/', function () {
        return formatResponse(200, 'API Homepage', true);
    });
    Route::group(['middleware' => ['cors', 'json.response']], function () {



        Route::prefix('auth')->group(function () {
            
            Route::post('register', 'Auth\ApiAuthController@register');
            Route::post('login', 'Auth\ApiAuthController@login');
            Route::get('/email/verification/{userId}', 'Auth\ApiVerificationController@verify')->name('verification.api.verify');
            Route::get('/email/verification/resend', 'Auth\ApiVerificationController@resend')->name('verification.api.resend');
            Route::post('/reset-password-request', 'Auth\ForgotPasswordController@sendPasswordResetEmail');
            Route::post('/password/reset', 'Auth\ResetPasswordController@reset');
        });


   });
});