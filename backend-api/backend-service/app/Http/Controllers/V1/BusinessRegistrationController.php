<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\BusinessAccount;
use App\Mail\BusinessWelcome;
use App\Models\BusinessProfile;
use App\Models\Country;
use App\Models\Industry;
use App\Models\User;
use App\Models\LearnerProfile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use jeremykenedy\LaravelRoles\Models\Role;

class BusinessRegistrationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * @OA\Post(
     *     path="/business/register",
     *     tags={"Business"},
     *     summary="Authority: Any | Create Business Account",
     *     description="Required fields are highlighted",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *               required={"first_name", "last_name", "email", "password", "country_id", "industry_id", "phone_number", "company_name", "no_of_employees", "company_phone"},
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
     *                 "company_phone":"08025162739", "no_of_employees":"100 above", "type_of_institution":"Tertiary", "registration_number":"RC2345664"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Business Account created successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
     * )
     */
    public function createProfile(BusinessAccount $request)
    {
        $data = $request->validated();
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
        'password' => Hash::make($data['password']),
        'category'=> 'BSN',
      ]);

        $data['user_id'] = $user->id;
        LearnerProfile::create($data);

        $role = Role::where('name', '=', 'Business')->first();
        $user->attachRole($role);

        /* $questence_url = preg_replace('/[^A-Za-z0-9]/', '', $request->company_name);
        $new_url = $questence_url.'.questence.org'; */

        $profile = new BusinessProfile();
        $profile->company_name    = $data['company_name'];
        $profile->no_of_employees = $data['no_of_employees'];
        if(!is_null($request->type_of_institution)) {
        $profile->type_of_institution = $data['type_of_institution'];
      }
        $profile->industry_id     = $data['industry_id'];
        $profile->country_id     = $data['country_id'];
        $profile->registration_number = $data['registration_number'];
        $profile->company_phone   = $request->country_code.$data['company_phone'];
        $user->businessProfile()->save($profile);
        $user->sendEmailVerificationNotification();
        $country->businessProfile()->save($profile);
        $industry->businessProfile()->save($profile);

        try {
            Mail::to($user->email)->send(new BusinessWelcome($user, $profile));
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
        return $user;
    }

}
