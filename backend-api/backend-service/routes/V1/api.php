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
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::get('/', function () {
        return formatResponse(200, 'Questence API Homepage', true);
    });

    Route::webhooks('webhook-paystack', 'paystack-webhook');
    Route::get('/email/us', 'HomeController@contactUs');

    Route::group(['middleware' => ['cors', 'json.response']], function () {

        Route::prefix('auth')->group(function () {
            //Route::get('/password/reset/{token}', 'Auth\ResetPasswordController@showResetView');
            Route::get('/email/verification/{userId}', 'Auth\ApiVerificationController@verify')->name('verification.api.verify');
            Route::get('/email/verification/resend', 'Auth\ApiVerificationController@resend')->name('verification.api.resend');
            Route::post('login', 'Auth\ApiAuthController@login');
            Route::post('/reset-password-request', 'Auth\ForgotPasswordController@sendPasswordResetEmail');
            Route::post('/password/reset', 'Auth\ResetPasswordController@reset');
        });

        Route::prefix('countries')->group(function () {
            Route::get('', 'CountryController@index');
            Route::get('/{countryId}', 'CountryController@show');
        });

        Route::prefix('languages')->group(function () {
            Route::get('', 'LanguageController@index');
            Route::get('/{languageId}', 'LanguageController@show');
        });

        Route::prefix('industries')->group(function () {
            Route::get('', 'IndustryController@index');
            Route::get('/{industryId}', 'IndustryController@show');
        });

        Route::prefix('certificates')->group(function () {
            Route::get('', 'CertificateController@index');
            Route::get('/{certificateId}', 'CertificateController@show');
        });

        Route::prefix('learners')->group(function () {
            Route::post('register', 'Auth\ApiAuthController@register');
        });

        Route::prefix('instructors')->group(function () {
            Route::get('/active/Profiles', 'InstructorProfileController@activeProfiles');
            Route::get('/{userId}', 'InstructorProfileController@show');
            Route::post('register', 'Auth\ApiAuthController@instructorRegister');
        });

        Route::prefix('business')->group(function () {
            Route::post('/register', 'BusinessRegistrationController@createProfile');
        });

        Route::prefix('categories')->group(function () {
            Route::get('', 'CategoryController@index');
            Route::get('/parent', 'CategoryController@getParentCategories');
            Route::get('/subCategories', 'CategoryController@getSubCategories');
            Route::get('/{categoryId}', 'CategoryController@show');
        });

        Route::prefix('search')->group(function () {
          Route::post('/courses', 'SearchController@searchFilter');
        });

        Route::prefix('courses')->group(function () {
          Route::get('', 'CourseController@index');
          Route::get('/topPicks', 'CourseController@getTopCourses');
          Route::get('/{courseId}', 'CourseController@show');
          Route::get('/{courseId}/curriculum', 'CourseController@getCourseCurriculum');
        });

        Route::prefix('business')->group(function () {
          Route::get('/activeProfiles', 'BusinessProfileController@activeProfiles');
          Route::get('/{profileId}', 'BusinessProfileController@show');
        });

        Route::group(['middleware' => ['auth:api', 'App\Http\Middleware\Enabler', 'role:superadmin|admin|instructor|business|user']], function () {
            Route::prefix('auth')->group(function () {
                Route::post('/logout', 'Auth\ApiAuthController@logout');
                Route::get('/me', 'UserController@userDetails');
                Route::get('/my/info', 'UserController@userInfo');
                Route::post('/update-password', 'UserController@changePassword');
            });

            Route::prefix('search')->group(function () {
                Route::get('/courses/counter/{userId}', 'SearchController@learnerCounter');
                Route::get('/instructor/courses/counter/{userId}', 'SearchController@getCourseCount');
            });

            Route::prefix('users')->group(function () {
                Route::post('/profile-photo', 'UserController@uploadPhoto');
            });

            Route::prefix('enrollments')->group(function () {
                Route::get('/me', 'EnrollmentController@getUserEnrollments');
                Route::get('/{enrollmentId}', 'EnrollmentController@show');
            });

            Route::prefix('wishlists')->group(function () {
                Route::get('/me', 'WishListController@getUserWishLists');
                Route::post('/add', 'WishListController@store');
                Route::delete('/{wishlistId}/delete', 'WishListController@destroy');
            });

            Route::prefix('notifications')->group(function () {
                Route::get('', 'NotificationController@allNotifications');
                Route::get('/unread', 'NotificationController@unreadNotifications');
            });

            Route::prefix('courses')->group(function () {
              Route::get('/my/archivedCourses', 'CourseController@userArchivedCourses');
              Route::post('/{courseId}/archive', 'CourseController@archive');
            });

            Route::prefix('blog')->group(function () {
                Route::get('', 'BlogController@index');
                Route::get('/{slug}', 'BlogController@show');
            });

            Route::prefix('comments')->group(function () {
                Route::post('/create', 'CommentController@store');
                Route::put('/update/{commentId}', 'CommentController@update');
            });

            Route::prefix('programmes')->group(function () {
                Route::get('', 'ProgrammeController@index');
            });
            
            Route::prefix('programmeLevel')->group(function () {
                Route::get('', 'ProgrammeLevelController@index');
            });

        });

        Route::group(['middleware' => ['auth:api', 'App\Http\Middleware\Enabler', 'role:superadmin|admin|instructor|business']], function () {

            Route::prefix('enrollments')->group(function () {
                Route::post('/create', 'EnrollmentController@storeForBusiness');
                Route::post('/enrolMultiple', 'EnrollmentController@createMultiple');
                Route::post('/assignCourse', 'EnrollmentController@assignCourse');
                Route::put('/update/{id}', 'EnrollmentController@updateEnrollment');
            });
        });

        Route::group(['middleware' => ['auth:api', 'App\Http\Middleware\Enabler', 'role:superadmin|instructor']], function () {
           Route::prefix('courses')->group(function () {
               Route::get('enrolled/users/{courseId}', 'CourseController@getEnrolledUsers');
            });
        });

        Route::group(['middleware' => ['auth:api', 'suspended.business', 'App\Http\Middleware\Enabler', 'role:business']], function () {

            Route::prefix('business')->group(function () {
                Route::get('/profile', 'BusinessProfileController@getProfile');
                Route::get('/courses', 'BusinessProfileController@getCourses');
                Route::get('/enrollments/me', 'EnrollmentController@getBusinessEnrollments');
                Route::get('/members/me', 'BusinessMemberController@getBusinessMembers');
                Route::post('/members/create', 'BusinessMemberController@store');
                Route::post('/profile-photo', 'BusinessProfileController@updateLogo');
                Route::get('/courses/{courseId}', 'BusinessProfileController@getCourse');
                //Route::get('/{profileId}/country', 'BusinessProfileController@getCountry');
                //Route::get('/{profileId}/industry', 'BusinessProfileController@getIndustry');
                Route::put('/profile/{id}', 'BusinessProfileController@updateProfile');
                Route::delete('/members/{userId}/delete', 'BusinessMemberController@destroy');
            });

        });

        //Learner Profile

        Route::group(['middleware' => ['auth:api', 'suspended', 'App\Http\Middleware\Enabler', 'role:user|instructor|business']], function () {
            Route::prefix('learners')->group(function () {
                Route::get('/my/payments', 'LearnerProfileController@payments');
                Route::get('/profile', 'LearnerProfileController@getLearnerProfile');
                Route::post('/profile', 'LearnerProfileController@store');
                Route::patch('/deactivate/profile', 'LearnerProfileController@deactivateProfile');
                Route::put('/profile/{userId}', 'LearnerProfileController@update');
            });

            Route::prefix('enrollments')->group(function () {
                Route::post('/enrol', 'EnrollmentController@store');
                Route::post('/enrol/learnerEnrolMultiple', 'EnrollmentController@learnerEnrolMultiple');
            });

            Route::prefix('checkout')->group(function () {
              Route::post('', 'CoursePaymentController@checkout');
            });

            Route::prefix('courses')->group(function () {
                Route::post('/enrol', 'EnrollmentController@store');
            });
        });

        //Instructor Profile
        Route::group(['middleware' => ['auth:api', 'suspended', 'App\Http\Middleware\Enabler', 'role:instructor|superadmin']], function () {
            Route::prefix('search')->group(function () {
                Route::get('/mycourses/counter', 'SearchController@instructorCounter');
            });

            Route::prefix('instructors')->group(function () {
                Route::get('/my/profile', 'InstructorProfileController@getInstructorProfile');
                Route::post('/profile', 'InstructorProfileController@store');
                Route::put('/profile/{userId}', 'InstructorProfileController@update');
            });

            Route::prefix('courses')->group(function () {
              Route::get('/my/courses', 'InstructorProfileController@getCourses');
              Route::get('/mycourses/{courseId}', 'InstructorProfileController@getCourse');
              Route::get('/my/activeCourses', 'CourseController@myActiveCourses');
              Route::get('/my/deactivatedCourses', 'CourseController@myDeactivatedCourses');
              Route::get('/my/pendingCourses', 'CourseController@myPendingCourses');
              Route::post('/create', 'CourseController@createCourse');
              Route::put('/{courseId}', 'CourseController@updateCourse');
          });

          Route::prefix('bundles')->group(function () {
              Route::get('/mybundles', 'BundleController@myList');
              Route::get('/mybundles/{bundleId}', 'BundleController@getBundle');
              Route::post('/create', 'BundleController@create');
              Route::put('/{bundleId}', 'BundleController@update');
              Route::delete('{bundleId}/delete', 'BundleController@destroy');
           });
        });

        Route::group(['middleware' => ['auth:api', 'App\Http\Middleware\Enabler', 'role:superadmin']], function () {

             Route::prefix('search')->group(function () {
               Route::get('/counters/superadminDashboard', 'SearchController@superadminCounter');
             });

             Route::prefix('bundles')->group(function () {
               Route::get('', 'BundleController@index');
               Route::get('/activeBundles', 'BundleController@activeBundles');
               Route::get('/deactivatedBundles', 'BundleController@deactivatedBundles');
               Route::get('/{bundleId}', 'BundleController@show');
               Route::get('/payments', 'BundlePaymentController@index');
               Route::get('/pending/payments', 'BundlePaymentController@pendingPayments');
               Route::get('/failed/payments', 'BundlePaymentController@failedPayments');
               Route::get('/successful/payments', 'BundlePaymentController@successfulPayments');
               Route::get('/payment/{id}', 'BundlePaymentController@show');
               Route::get('/retrieve/payment/{payment_reference}', 'BundlePaymentController@getPayment');
               Route::put('/{bundleId}/activate', 'BundleController@activate');
               Route::put('/{bundleId}/deactivate', 'BundleController@deactivate');
               Route::delete('{bundleId}/delete', 'BundleController@destroy');
            });

            Route::prefix('business')->group(function () {
                Route::get('/all/Profiles', 'BusinessProfileController@index');
                Route::get('/all/members', 'BusinessMemberController@index');
                Route::get('/all/pendingProfiles', 'BusinessProfileController@pendingProfiles');
                Route::get('/all/deactivatedProfiles', 'BusinessProfileController@deactivatedProfiles');
                Route::post('/create/profile', 'BusinessProfileController@createProfile');
                Route::put('/profile/{userId}/update', 'BusinessProfileController@updateBusiness');
                Route::put('/{profileId}/activate', 'BusinessProfileController@activate');
                Route::put('/{profileId}/deactivate', 'BusinessProfileController@deactivate');
                Route::delete('/profile/{id}/delete', 'BusinessProfileController@destroy');
            });

            Route::prefix('courses')->group(function () {
                Route::get('/activeCourses', 'CourseController@activeCourses');
                Route::get('/archivedCourses', 'CourseController@archivedCourses');
                Route::get('/deactivatedCourses', 'CourseController@deactivatedCourses');
                Route::get('/deletedCourses', 'CourseController@deletedCourses');
                Route::get('/recycleBin', 'CourseController@recycleBin');
                Route::get('/payments', 'CoursePaymentController@index');
                Route::get('/pending/payments', 'CoursePaymentController@pendingPayments');
                Route::get('/failed/payments', 'CoursePaymentController@failedPayments');
                Route::get('/successful/payments', 'CoursePaymentController@successfulPayments');
                Route::get('/payment/{id}', 'CoursePaymentController@show');
                Route::get('/retrieve/payment/{payment_reference}', 'CoursePaymentController@getPayment');
                //Route::post('/create', 'CourseController@createCourse');
                Route::post('/topPicks', 'CourseController@selectTopCourses');
                Route::delete('/topPicks/{course_id}/delete', 'CourseController@removeTopCourse');
                Route::patch('/{id}/restore', 'CourseController@restoreDeletedCourse');
                Route::put('/{courseId}/activate', 'CourseController@activate');
                Route::put('/{courseId}/deactivate', 'CourseController@deactivate');
                //Route::post('/{id}/batchRestore', 'CourseController@batchRestore');
                //Route::post('/{id}/batchDelete', 'CourseController@batchDelete');
                Route::delete('/{id}/delete', 'CourseController@destroy');
                Route::delete('/{id}/erase', 'CourseController@deletePermanently');
            });

            Route::prefix('learners')->group(function () {
                Route::get('', 'LearnerProfileController@index');
                Route::get('/activeProfiles', 'LearnerProfileController@activeProfiles');
                Route::get('/deactivatedProfiles', 'LearnerProfileController@deactivatedProfiles');
                Route::get('/{userId}', 'LearnerProfileController@show');
                Route::patch('/{userId}/upgrade', 'LearnerProfileController@upgradeLearner');
                Route::post('/create/profile', 'LearnerProfileController@createProfile');
                Route::put('/profile/{userId}/update', 'LearnerProfileController@updateLearner');
                Route::put('/{userId}/activate', 'LearnerProfileController@activate');
                Route::put('/{userId}/deactivate', 'LearnerProfileController@deactivate');
                Route::delete('{userId}/delete', 'LearnerProfileController@destroy');
                // Route::post('{userId}/restore', 'LearnerProfileController@restore');
            });

            Route::prefix('instructors')->group(function () {
                Route::get('', 'InstructorProfileController@index');
                Route::get('/deactivated/Profiles', 'InstructorProfileController@deactivatedProfiles');
                Route::get('/pending/Profiles', 'InstructorProfileController@pendingProfiles');
                Route::post('/create/profile', 'InstructorProfileController@createProfile');
                Route::put('/{userId}/update', 'InstructorProfileController@updateInstructor');
                Route::put('/{userId}/activate', 'InstructorProfileController@activate');
                Route::put('/{userId}/deactivate', 'InstructorProfileController@deactivate');
                Route::delete('{userId}/disapprove', 'InstructorProfileController@disapprove');
                Route::delete('{userId}/delete', 'InstructorProfileController@destroy');
                // Route::post('{userId}/restore', 'InstructorProfileController@restore');
            });

            Route::prefix('certificates')->group(function () {
                Route::post('/create', 'CertificateController@store');
                Route::put('/update/{certificateId}', 'CertificateController@update');
                Route::delete('/{certificateId}/delete', 'CertificateController@destroy');
            });

            Route::prefix('categories')->group(function () {
                Route::post('/parent', 'CategoryController@store');
                Route::post('/subcategory', 'CategoryController@createSubcategory');
                Route::put('/parent/{categoryId}', 'CategoryController@update');
                Route::put('/subcategory/{categoryId}', 'CategoryController@updateSubcategory');
                Route::delete('{categoryId}/delete', 'CategoryController@destroy');
                Route::delete('{subCategoryId}/removeSubcategory', 'CategoryController@deleteSubcategory');
                Route::post('/{categoryId}/restore', 'CategoryController@restore');
                Route::post('/{categoryId}/restoreSubcategory', 'CategoryController@restoreSubcategory');
                Route::post('/{categoryId}/restoreAll', 'CategoryController@restoreAll');
            });

            Route::prefix('enrollments')->group(function () {
                Route::get('', 'EnrollmentController@index');
                Route::get('/business/{businessId}', 'EnrollmentController@getAllBusinessEnrollments');
            });

            

            Route::prefix('blog')->group(function () {
                Route::post('/create', 'BlogController@store');
                Route::put('/update/{blogId}', 'BlogController@update');
                Route::delete('/{blogId}/delete', 'BlogController@destroy');
            });

            Route::prefix('comments')->group(function () {
                Route::delete('/{commentId}/delete', 'CommentController@destroy');
            });
        });

    });
});
