<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\BusinessProfile;
use App\Models\LearnerProfile;
use App\Models\Country;
use App\Models\Course;
use App\Models\Industry;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\BusinessAccount;
use App\Mail\BusinessWelcome;
use App\Mail\BusinessApproved;
use App\Notifications\BusinessProfileNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use jeremykenedy\LaravelRoles\Models\Role;

class BusinessProfileController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *     path="/business/all/Profiles",
     *     tags={"Business"},
     *     summary="Authority: SuperAdmin | Fetch all business profiles",
     *     @OA\Response(response="200", description="List of all business profiles is returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function index()
    {
        $business_profiles = BusinessProfile::with('user', 'industry', 'country')->orderby('company_name', 'asc')->paginate(15);
        $counter = $business_profiles->count();
        $message = $counter.' item(s) returned';

        return response()->json([
              'success' => true,
              'message' => $message,
              'data' => [
                  'profiles' => $business_profiles,
                  'counter' => $counter,
              ],
          ], 200);
    }

    /**
     * @OA\Get(
     *     path="/business/activeProfiles",
     *     tags={"Business"},
     *     summary="Authority: Any | Admin Fetch all active business profiles",
     *     @OA\Response(response="200", description="List of all active business profiles is returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function activeProfiles()
    {
        $active_profiles = BusinessProfile::with('user', 'courses', 'industry', 'country')->where('status', '1')->paginate(15);
        $counter = $active_profiles->count();
        $message = $counter.' Active Business Profiles Retrieved Successfully';
        if (count($active_profiles) < 1) {
            return response()->json([
             'message' => 'No Active Business Profiles',
         ], 200);
        } else {
            return response()->json([
          'success' => true,
          'message' => $message,
          'data' => [
              'profiles' => $active_profiles,
              'counter' => $counter,
          ],
      ], 200);
        }
    }

    /**
     * @OA\Get(
     *     path="/business/all/pendingProfiles",
     *     tags={"Business"},
     *     summary="Authority: SuperAdmin | Admin Fetch all pending business profiles",
     *     @OA\Response(response="200", description="List of all pending business profiles is returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function pendingProfiles() {
      $pending_profiles = BusinessProfile::with('user', 'industry', 'country')->where('status', '0')->paginate(15);
      $counter = $pending_profiles->count();
      $message = $counter.' Pending Business Profiles Retrieved Successfully';
      if (count($pending_profiles) < 1) {
          return response()->json([
           'message' => 'No Pending Business Profiles',
       ], 200);
      } else {
          return response()->json([
        'success' => true,
        'message' => $message,
        'data' => [
            'profiles' => $pending_profiles,
            'counter' => $counter,
        ],
    ], 200);
      }
    }

    /**
     * @OA\Get(
     *     path="/business/all/deactivatedProfiles",
     *     tags={"Business"},
     *     summary="Authority: SuperAdmin | Admin Fetch all deactivated business profiles",
     *     @OA\Response(response="200", description="List of all deactivated business profiles is returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */

    public function deactivatedProfiles()
    {
        $deactivated_profiles = BusinessProfile::with('user', 'industry', 'country')->where('status', '-1')->paginate(15);
        $counter = $deactivated_profiles->count();
        $message = $counter.' Deactivated Business Profiles Retrieved Successfully';
        if (count($deactivated_profiles) < 1) {
            return response()->json([
            'message' => 'No Deactivated Business Profiles',
        ], 200);
        } else {
            return response()->json([
         'success' => true,
         'message' => $message,
         'data' => [
             'profiles' => $deactivated_profiles,
             'counter' => $counter,
         ],
     ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *     path="/business/{ProfileId}/industry",
     *     tags={"Business"},
     *     summary="Authority: Business | Get Industry a Business belongs to",
     *     description="Profile ID is compulsory",
     *     @OA\Parameter(
     *        name="ProfileId",
     *        description="ID of the profile",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(response="200", description="Industry of Business retrieved successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
     /*
    public function getIndustry($profile_id)
    {
        $business_profile = BusinessProfile::find($profile_id);
        if (is_null($business_profile)) {
            return response()->json([
                'error' => 'Business Profile does not exist',
            ], 404);
        }
        else {
            $industry =  Industry::find($business_profile->industry_id);
            $industry_name = $industry->name;
            return response()->json([
            'success' => true,
            'message' => 'Country Retrieved Successfully.',
            'data' => [
                'profile' => $business_profile,
                'industry' => $industry_name,
            ],
        ], 200);
        }
    }
*/
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *     path="/business/{ProfileId}/country",
     *     tags={"Business"},
     *     summary="Authority: Business | Get country of Registration of a Business",
     *     description="Profile ID is compulsory",
     *     @OA\Parameter(
     *        name="ProfileId",
     *        description="ID of the profile",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(response="200", description="Country of Registeration retrieved successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
     /*
    public function getCountry($profile_id)
    {
        $business_profile = BusinessProfile::find($profile_id);
        if (is_null($business_profile)) {
            return response()->json([
                'error' => 'Business Profile does not exist',
            ], 404);
        }
        else {
            $country =  Country::find($business_profile->country_id);
            $country_name = $country->name;
            return response()->json([
            'success' => true,
            'message' => 'Country Retrieved Successfully.',
            'data' => [
                'profile' => $business_profile,
                'country' => $country_name,
            ],
        ], 200);
        }
    }
    */

    /**
    * @OA\Get(
    *     path="/business/profile",
    *     tags={"Business"},
    *     summary="Authority: Business | Get the business profile of the currently Authenticated user",
    *     description="Authorization token needed",
    *     @OA\Response(response="200", description="Business profile is returned"),
    *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
    *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
    *     @OA\Response(response="404", description="Resource not found"),
    * )
    */
    public function getProfile()
    {
        $user = User::find(Auth::id());
        if (is_null($user)) {
            return response()->json([
                'error' => 'User does not exist',
            ], 404);
        } else {
            $profile = BusinessProfile::with('user', 'courses', 'industry', 'country')->where('user_id', Auth::id())->first();
            return response()->json([
            'success' => true,
            'message' => 'Profile Retrieved Successfully.',
            'data' => [
                'profile' => $profile,
                'user' => $user,
            ],
        ], 200);
        }
    }

    /**
    * @OA\Get(
    *     path="/business/courses",
    *     tags={"Business"},
    *     summary="Authority: Business | Get the courses of the currently Authenticated user",
    *     description="Authorization token needed",
    *     @OA\Response(response="200", description="Course List is returned"),
    *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
    *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
    *     @OA\Response(response="404", description="Resource not found"),
    * )
    */
    public function getCourses()
    {
        $user = User::with('businessProfile')->find(Auth::id());
        if (is_null($user)) {
            return response()->json([
                'error' => 'User does not exist',
            ], 404);
        } else {
            $courses = Course::with('instructor')->where('business_id', $user->businessProfile->id)->paginate(15);
            $counter = $courses->count();

            return response()->json([
            'success' => true,
            'message' => 'Profile Retrieved Successfully.',
            'data' => [
              'courses' => $courses,
              'counter' => $counter
            ]
        ], 200);
        }
    }

    /**
    * @OA\Get(
    *     path="/business/courses/{courseId}",
    *     tags={"Business"},
    *     summary="Authority: Business | Get the details of a particular course Authenticated user",
    *     description="Authorization token needed",
    *     @OA\Response(response="200", description="Course is returned"),
    *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
    *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
    *     @OA\Response(response="404", description="Resource not found"),
    * )
    */
    public function getCourse($course_id)
    {
        $user = User::with('businessProfile')->find(Auth::id());
        if (is_null($user)) {
            return response()->json([
                'error' => 'User does not exist',
            ], 404);
        } else {
            $course = Course::with('instructor')->where([['id', $course_id], ['business_id', $user->businessProfile->id]])->get();
            return response()->json([
            'success' => true,
            'message' => 'Course Retrieved Successfully.',
            'data' => $course
        ], 200);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *     path="/business/{profileId}",
     *     tags={"Business"},
     *     summary="Authority: Any | Get details of a particular User and Business Profile",
     *     description="Profile ID is compulsory",
     *     @OA\Parameter(
     *        name="id",
     *        description="ID of the profile",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(response="200", description="Business Profile details retrieved successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function show($profile_id)
    {
        $profile = BusinessProfile::with('user', 'courses', 'industry', 'country')->find($profile_id);
        if (is_null($profile)) {
            return response()->json([
                'error' => 'Profile does not exist',
            ], 404);
        } else {
            return response()->json([
            'success' => true,
            'message' => 'Profile Retrieved Successfully.',
            'data'    => $profile
        ], 200);
        }
    }

    /**
     * @OA\Post(
     *     path="/business/create/profile",
     *     tags={"Business"},
     *     summary="Authority: Superadmin | Create Business Account",
     *     description="Required fields are highlighted",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *               required={"first_name", "last_name", "email", "country_id", "industry_id", "phone_number", "company_name", "no_of_employees", "company_phone"},
     *                @OA\RequestBody(
     *                    required=true,
     *                    content="application/json",
     *                 ),
     *                 @OA\Property(
     *                     property="first_name",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="last_name",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="country_id",
     *                     type="integer",
     *                 ),
     *                 @OA\Property(
     *                     property="industry_id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="phone_number",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="company_name",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="company_logo",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="no_of_employees",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="type_of_institution",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="company_phone",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="registration_number",
     *                     type="string",
     *                 ),
     *                 example={"first_name":"Peter", "last_name":"Oduntan", "email":"lorddubbs@gmail.com", "password":"secret123", "country_id":"156", "industry_id":"34", "phone_number":"07025162739", "company_name":"Questence Nigeria",
     *                 "company_phone":"08025162739", "company_logo":"https://shutterstock.com/file.jpg", "no_of_employees":"100 above", "type_of_institution":"Tertiary", "registration_number":"RC2345664"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Business Account created successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
     * )
     */
    public function createProfile(BusinessAccount $request) {
      $data = $request->validated();
      $password = str_random(8);
      $country = Country::find($request->country_id);
      $industry = Industry::find($request->industry_id);

      /* $country = Country::find($request->country_id);
      $code = $country->phonecode;
      $phone_no = $request->phone_number;
      $company_no = $request->company_phone;
      $split = substr($phone_no, 1, 10);
      $split2 = substr($company_no, 1, 10);
      $phone_number = '+'.$code.$split;
      $company_phone = '+'.$code.$split2; */

      $user = User::create([
      'first_name' => $data['first_name'],
      'last_name' => $data['last_name'],
      'email' => $data['email'],
      'phone_number' => $request->country_code.$data['phone_number'],
      'password' => Hash::make($password),
      'category'=> 'BSN',
    ]);

      $data['user_id'] = $user->id;
      LearnerProfile::create($data);

      $role = Role::where('name', '=', 'Business')->first();
      $user->attachRole($role);

      $company_logo = null;
      if (!empty($data['company_logo'])) {
          $thumbnail = $data['company_logo'];
          $uploader = $thumbnail->storeOnCloudinary('Company-Logos');
          $company_logo = $uploader->getSecurePath();
      }

      /* $questence_url = preg_replace('/[^A-Za-z0-9]/', '', $request->company_name);
      $new_url = $questence_url.'.questence.org'; */

      $profile = new BusinessProfile();
      $profile->company_name    = $data['company_name'];
      $profile->no_of_employees = $data['no_of_employees'];
      $profile->company_logo = $company_logo;
      if(!is_null($request->type_of_institution)) {
      $profile->type_of_institution = $data['type_of_institution'];
    }
      $profile->industry_id     = $data['industry_id'];
      $profile->country_id     = $data['country_id'];
      $profile->registration_number = $data['registration_number'];
      $profile->company_phone   = $request->country_code.$data['company_phone'];
      $user->businessProfile()->save($profile);
      $country->businessProfile()->save($profile);
      $industry->businessProfile()->save($profile);

      try {
          Mail::to($user->email)->send(new BusinessWelcome($user, $profile));
          Mail::to($user->email)->send(new BusinessApproved($user, $password));
      } catch (Exception $e) {
          return response()->json([
              'error' => 'There seems to be a mail error.',
          ], 404);
      }
      /* $response = [
            'success' => true,
            'message' => $message,
            'data'    => $result,
        ];
      return response()->json($response, 200); */
      return formatResponse(200, 'Business profile created successfully', true, $user);
  }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Put(
     *     path="/business/profile/{id}",
     *     tags={"Business"},
     *     summary="Authority: Superadmin | Admin | Update a particular business profile | Please use x-www-form-urlencoded for body",
     *     @OA\Parameter(
     *        name="id",
     *        description="Business profile ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                @OA\RequestBody(
     *                    required=true,
     *                    content="application/json",
     *                 ),
     *                 @OA\Property(
     *                     property="company_name",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="company_phone",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="company_logo",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="hq_address",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="company_description",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="registration_number",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="no_of_employees",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="industry_id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="linkedin_page",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="facebook_page",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="color_theme",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="website",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="country_id",
     *                     type="integer"
     *                 ),
     *                 example={"company_name":"Questence Nigeria", "hq_address":"Ikoyi, Lagos", "company_logo":"https://shutterstock.com/file.jpg", "company_phone":"08025162739", "company_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
     *                 "registration_number":"RC45346", "no_of_employees":"100", "industry_id":"1", "linkedin_page":"https://linkedin.com/Questence", "facebook_page":"https://facebook.com/Questence",
     *                 "color_theme":"blue", "website": "https://example.com", "country_id":"153"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Business profile updated successfully"),
     *     @OA\Response(response="400", description="Bad Request"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function updateProfile(Request $request, $profile_id)
    {
        $business_profile = BusinessProfile::find($profile_id);
        if (is_null($business_profile)) {
            return response()->json([
                'error' => 'Profile does not exist',
            ], 404);
        } else {
            $this->validate($request, [
                'company_name' => 'string|min:5|max:255|unique:business_profiles,company_name,'.$profile_id,
                'hq_address' => 'string|max:255',
                'company_description' => 'string|min:160',
                'registration_number' => 'string|min:6|unique:business_profiles,registration_number,'.$profile_id,
                'company_phone' => 'required|string|unique:business_profiles',
                'company_logo' => 'nullable|image|mimes:jpg,jpeg,png|max:300|dimensions:min_width=100,min_height=100,max_width=150,max_height=150',
                'no_of_employees' => 'integer',
                'linkedin_page' => 'string|url|max:255|unique:business_profiles,linkedin_page,'.$profile_id,
                'facebook_page' => 'string|url|max:255|unique:business_profiles,facebook_page,'.$profile_id,
                'color_theme' => 'string',
                'website' => 'string|url|max:255|unique:business_profiles,website,'.$profile_id,
                'country_id' => 'integer'
            ],
            ['company_name.unique' => 'A Company with this name already exists.',
              'linkedin_page.unique' => 'This Linkedin page belongs to another user',
              'facebook_page.unique' => 'This Facebook page belongs to another user',
              'website.unique' => 'This website belongs to another user',

            ]);

            $company_logo = null;
            if (!empty($data['company_logo'])) {
                $thumbnail = $request['company_logo'];
                $uploader = $thumbnail->storeOnCloudinary('Company-Logos');
                $uploader->getSecurePath();
            }

            /*
            $country = Country::find($request->country_id);
            $code  = $country->phonecode;
            $phone_no = $request->phone_number;
            $split = substr($phone_no, 1, 10);
            $phone_number = '+'.$code.$split;

            $industry = Industry::find($request->industry_id);
            $industry_name = $industry->name;
            */

            /* $user->first_name = $request->first_name;
            $user->last_name  = $request->last_name;
            $user->email      = $request->email;
            $user->phone_number = $phone_number;

            if(!is_null($request->hasFile('company_logo')))
            $user = User::find($business_profile->user_id);
            $username = $user->businessProfile->company_name.'-ID-'.$user->businessProfile->id.'-photo';
            $user->businessProfile->company_logo = $this->uploadPhoto($request->hasFile('company_logo'), $username);
            $user->push();
            */

            $business_profile->fill($request->input())->save();

            $this->sendUpdateNotification($business_profile->user);

            return response()->json([
              'success' => true,
              'message' => 'Business Profile updated Successfully.',
              'data' => $business_profile,
          ], 200);
        }
    }

    /**
     * @OA\Put(
     *     path="/business/profile/{id}/update",
     *     tags={"Business"},
     *     summary="Authority: Superadmin | Update a particular business profile | Please use x-www-form-urlencoded for body",
     *     @OA\Parameter(
     *        name="id",
     *        description="Business profile ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                @OA\RequestBody(
     *                    required=true,
     *                    content="application/json",
     *                 ),
     *                 @OA\Property(
     *                     property="company_name",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="company_phone",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="company_logo",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="hq_address",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="company_description",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="registration_number",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="no_of_employees",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="industry_id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="linkedin_page",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="facebook_page",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="color_theme",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="website",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="country_id",
     *                     type="integer"
     *                 ),
     *                 example={"company_name":"Questence Nigeria", "hq_address":"Ikoyi, Lagos", "company_phone":"08025162739", "company_logo":"https://shutterstock.com/file.jpg", "company_description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
     *                 "registration_number":"RC45346", "no_of_employees":"100", "industry_id":"1", "linkedin_page":"https://linkedin.com/Questence", "facebook_page":"https://facebook.com/Questence",
     *                 "color_theme":"blue", "website": "https://example.com", "country_id":"153"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Business profile updated successfully"),
     *     @OA\Response(response="400", description="Bad Request"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function updateBusiness(Request $request, $profile_id)
    {
        $business_profile = BusinessProfile::find($profile_id);
        if (is_null($business_profile)) {
            return response()->json([
                'error' => 'Profile does not exist',
            ], 404);
        } else {
            $this->validate($request, [
                'company_name' => 'string|min:5|max:255|unique:business_profiles,company_name,'.$profile_id,
                'hq_address' => 'string|max:255',
                'company_description' => 'string|max:255',
                'registration_number' => 'string|min:6|unique:business_profiles,registration_number,'.$profile_id,
                'company_logo' => 'nullable|image|mimes:jpg,jpeg,png|max:300|dimensions:min_width=100,min_height=100,max_width=150,max_height=150',
                'company_phone' => 'nullable|string|unique:business_profiles',
                'no_of_employees' => 'integer',
                'linkedin_page' => 'string|url|max:255|unique:business_profiles,linkedin_page,'.$profile_id,
                'facebook_page' => 'string|url|max:255|unique:business_profiles,facebook_page,'.$profile_id,
                'color_theme' => 'string',
                'website' => 'string|url|max:255|unique:business_profiles,website,'.$profile_id,
                'country_id' => 'integer'
            ],
            ['company_name.unique' => 'A Company with this name already exists.',
              'linkedin_page.unique' => 'This Linkedin page belongs to another user',
              'facebook_page.unique' => 'This Facebook page belongs to another user',
              'website.unique' => 'This website belongs to another user',

            ]);

            $company_logo = null;
            if (!empty($data['company_logo'])) {
                $thumbnail = $request['company_logo'];
                $uploader = $thumbnail->storeOnCloudinary('Company-Logos');
                $uploader->getSecurePath();
            }

            /*
            $country = Country::find($request->country_id);
            $code  = $country->phonecode;
            $phone_no = $request->phone_number;
            $split = substr($phone_no, 1, 10);
            $phone_number = '+'.$code.$split;

            $industry = Industry::find($request->industry_id);
            $industry_name = $industry->name;
            */

            /* $user->first_name = $request->first_name;
            $user->last_name  = $request->last_name;
            $user->email      = $request->email;
            $user->phone_number = $phone_number;

            if(!is_null($request->hasFile('company_logo')))
            $user = User::find($business_profile->user_id);
            $username = $user->businessProfile->company_name.'-ID-'.$user->businessProfile->id.'-photo';
            $user->businessProfile->company_logo = $this->uploadPhoto($request->hasFile('company_logo'), $username);
            $user->push();
            */

            $business_profile->fill($request->input())->save();

            $this->sendUpdateNotification($business_profile->user);

            return response()->json([
              'success' => true,
              'message' => 'Business Profile updated Successfully.',
              'data' => $business_profile,
          ], 200);
        }
    }

    /*public function updateCountry(Request $request, $profile_id)
     {
       $business_profile = BusinessProfile::find($profile_id);
       if(is_null($business_profile)){
           return response()->json([
               'error' => "Profile does not exist"
           ], 404);
       }
       else {
         $this->validate($request, [
             'country_id' => 'integer',
         ]);
         $country = Country::find($request->country_id);
         $code  = $country->phonecode;
         $phone_no = $request->phone_number;
         $split = substr($phone_no, 1, 10);
         $phone_number = '+'.$code.$split;

         $business_profile->update([
           'country_id'  => $request->country_id,
           'primary_contact_phone'  => $request->primary_contact_phone
         ]);

         return response()->json([
           'success' => true,
           'message' => "Country updated Successfully.",
           'data' => $business_profile
       ], 200);
       }
     }*/

    /**
     * @OA\Post(
     *     path="/business/profile-photo",
     *     tags={"Business"},
     *     summary="Authority: Business | Upload Profile Photo for Authenticated User",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                  required={"image"},
     *                @OA\RequestBody(
     *                    required=true,
     *                    content="application/json",
     *                 ),
     *                 @OA\Property(
     *                     property="company_logo",
     *                     type="file",
     *                 ),
     *                 example={"company_logo":"https://shutterstock.com/file.jpg"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Company Logo Uploaded Successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function updateLogo(Request $request)
    {
        $business_profile = BusinessProfile::with('user', 'industry', 'country')->where('user_id', Auth::id());
        if (is_null($business_profile)) {
            return response()->json([
              'error' => 'Profile does not exist',
          ], 404);
        } else {
            try {
                DB::beginTransaction();
                $data = $request->all();

                $validator = Validator::make($request->all(), [
                    'company_logo' => 'required|mimes:jpg,jpeg,png|max:300|dimensions:min_width=100,min_height=100,max_width=150,max_height=150',
                ], $messages = [
                    'mimes' => 'Please insert image with jpeg/png formats only',
                    'max'   => 'Image should be less than 300 KB',
                    'dimensions' => 'Image Minimum Dimension is 100x100 and Max Dimension is 150x150',
                ]);

                if ($validator->fails()) {
                    return formatResponse(422, 'Oh Snap! An error occured.', false, $validator->errors());
                }

                $username = $business_profile->company_name.'-ID-'.$business_profile->id.'-photo';

                if ($request->hasFile('company_logo')) {
                    $cloudinary_upload = $request->file('image')->storeOnCloudinaryAs('company-logos', $username);
                    $business_profile->company_logo = $cloudinary_upload->getSecurePath();
                    $url = $cloudinary_upload->getSecurePath();
                }
                $business_profile->save();

                DB::commit();

                return formatResponse(200, 'Company Logo Uploaded Successfully.', true, $url);
            } catch (Exception $e) {
                DB::rollBack();

                return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
            }
        }
    }

    /**
     * @OA\Put(
     *     path="/business/{profileId}/activate",
     *     tags={"Business"},
     *     summary="Authority: SuperAdmin | Activate a business profile for use",
     *     @OA\Parameter(
     *        name="ProfileId",
     *        description="ID of the business profile",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(response="200", description="Business Profile Activated successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function activate($profile_id)
    {
        $business_profile = BusinessProfile::find($profile_id);
        if (is_null($business_profile)) {
            return response()->json([
                   'error' => 'Profile does not exist',
               ], 404);
        } else {
            $business_profile->status = '1';
            $business_profile->save();
            $message = 'Business Account has been activated';

            $this->sendNotification($business_profile->user_id, $profile_id, $message);

            return response()->json([
              'success' => true,
              'message' => $message,
              'data' => $business_profile,
          ], 200);
        }
    }

    /**
     * @OA\Put(
     *     path="/business/{profileId}/deactivate",
     *     tags={"Business"},
     *     summary="Authority: SuperAdmin | Deactivate a business profile",
     *     @OA\Parameter(
     *        name="ProfileId",
     *        description="ID of the business profile",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(response="200", description="Business Profile Deactivated successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function deactivate($profile_id)
    {
        $business_profile = BusinessProfile::find($profile_id);
        if (is_null($business_profile)) {
            return response()->json([
                    'error' => 'Profile does not exist',
                ], 404);
        } else {
            $business_profile->status = '-1';
            $business_profile->save();
            $message = 'Business Account has been Deactivated';

            $this->sendNotification($business_profile->user_id, $profile_id, $message);

            return response()->json([
               'success' => true,
               'message' => $message,
               'data' => $business_profile,
           ], 200);
        }
    }

    public function sendUpdateNotification($user)
    {
        $notif = [
          'greeting' => "$user->first_name,",
          'body' => "Your profile has been updated",
          'thanks' => '',
          'actionText' => 'View',
          'actionURL' => url('/profile'),
          'user_id' => $user->id
        ];
        try {
        return Notification::send($user, new ProfileUpdateNotification($notif));
      } catch (\Exception $e) {
          Log::error('Profile updated successfully, but unable to send Notification to User. Please check your network connectivity.');
      }
    }

    public function sendNotification($user_id, $profile_id, $message)
    {
        $user = User::find($user_id);
        $notif = [
                'greeting' => 'Congratulations',
                'body' => 'Your '.$message,
                'thanks' => 'Welcome aboard',
                'actionText' => 'Get Started',
                'actionURL' => url('/login'),
                'profile_id' => $profile_id,
                'user_id' => $user_id,
            ];
        try {
            Notification::send($user, new BusinessProfileNotification($notif));
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * @OA\Delete(
     *     path="/business/profile/{id}/delete",
     *     tags={"Business"},
     *     summary="Authority: SuperAdmin | Delete a Business profile",
     *     @OA\Parameter(
     *        name="Id",
     *        description="ID of the profile",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(response="200", description="Profile deleted successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function destroy($profile_id)
    {
        $business_profile = BusinessProfile::find($profile_id);
        if (is_null($business_profile)) {
            return response()->json([
              'error' => 'Profile does not exist',
          ], 404);
        } else {
            $business_profile->delete();

            return response()->json([
              'success' => true,
              'message' => 'Business Profile Deleted Successfully',
              'data' => $business_profile,
          ], 200);
        }
    }
}
