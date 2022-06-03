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

        /*Authentication routes for user/students*/

        Route::prefix('auth')->group(function () {
            
            Route::post('/register', 'Auth\ApiAuthController@register');
            Route::post('/login', 'Auth\ApiAuthController@login');
            Route::get('/email/verification/{userId}', 'Auth\ApiVerificationController@verify')->name('verification.api.verify');
            Route::get('/email/verification/resend', 'Auth\ApiVerificationController@resend')->name('verification.api.resend');
            Route::post('/reset-password-request', 'Auth\ForgotPasswordController@sendPasswordResetEmail');
            Route::post('/password/reset', 'Auth\ResetPasswordController@reset');
        });


    /*user routes to access countries api*/
         Route::prefix('countries')->group(function () {
            Route::get('', 'CountryController@index');
            Route::get('/{countryId}', 'CountryController@show');
        });
 /*user routes to access languages api*/
        Route::prefix('languages')->group(function () {
            Route::get('', 'LanguageController@index');
            Route::get('/{languageId}', 'LanguageController@show');
        });
 /*user routes to access industries api*/
        Route::prefix('industries')->group(function () {
            Route::get('', 'IndustryController@index');
            Route::get('/{industryId}', 'IndustryController@show');
        });
 /*user routes to access certificates api*/
        Route::prefix('certificates')->group(function () {
            Route::get('', 'CertificateController@index');
            Route::get('/{certificateId}', 'CertificateController@show');
        });

         /*user routes to access instructors api*/

        Route::prefix('instructors')->group(function () {
            Route::get('/active/Profiles', 'InstructorProfileController@activeProfiles');
            Route::get('/{userId}', 'InstructorProfileController@show');
            Route::post('register', 'Auth\ApiAuthController@instructorRegister');
        });
 /*user routes to access business api*/
        Route::prefix('business')->group(function () {
            Route::post('/register', 'BusinessRegistrationController@createProfile');
        });
 /*user routes to access course categories api*/
        Route::prefix('categories')->group(function () {
            Route::get('', 'CategoryController@index');
            Route::get('/parent', 'CategoryController@getParentCategories');
            Route::get('/subCategories', 'CategoryController@getSubCategories');
            Route::get('/{categoryId}', 'CategoryController@show');
        });

 /*user routes to access search api*/
        Route::prefix('search')->group(function () {
          Route::post('/courses', 'SearchController@searchFilter');
        });



   });
});