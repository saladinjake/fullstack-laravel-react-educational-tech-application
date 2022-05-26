<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\InstructorProfile;
use App\Models\LearnerProfile;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\CreateLearnerRequest;
use App\Http\Requests\CreateInstructorRequest;
use jeremykenedy\LaravelRoles\Models\Role;
use App\Mail\UserWelcome;
use App\Mail\InstructorWelcome;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Events\Verified;

class ApiAuthController extends Controller
{
    use ThrottlesLogins, VerifiesEmails;
    /**
     * Account Lock.
     */

    /**
     * Maximum attempts
     * User limited to 5 login attempts at a time.
     */
    protected $maxAttempts = 5;

    /**
     * Lock Timeout
     * Account lock times out after 10 minutes.
     */
    protected $decayMinutes = 10;

    /**
     * @OA\Post(
     *     path="/auth/login",
     *     tags={"Auth"},
     *     summary="Authority: None | User Login",
     *     description="Authenticate an existing user and retrieve a token.",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                  required={"email", "password"},
     *                @OA\RequestBody(
     *                    required=true,
     *                    content="application/json",
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string",
     *                 ),
     *                  @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 example={"email":"Your email address", "password":"Your password"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *        description="Successful Authentication. Access Token Returned",
     *        @OA\JsonContent(
     *              example={"success":"true", "status_code":200, "token_type": "Bearer","expires_in": 1296000,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJyJhdWQiOiIyIiwianRpIjoiNWJmNDY4OTFhYmJmYjk1YzQwN2E1MzNkZjMxNmEzNDMzZDBlZmI2ZDc4NmI0NmMwNjgwODFjODg0N2E3MDVjYTk4ZDNiMTVlODI1ZDcwYjQiLCJpYXQiaX0...."}
     *        )
     *     ),
     *     @OA\Response(response="400", description="Bad Request")
     * )
     */
    public function username()
    {
        return 'email';
    }

    /**
     * Login Throttling
     * Restrict user after 5 attempts
     * Try again after 10 minutes.
     */
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email|max:191',
                'password' => 'required|string|min:6',
            ]);
            if ($this->hasTooManyLoginAttempts($request)) {
                //Fire the lockout event.
                $this->fireLockoutEvent($request);

                return formatResponse(429, 'Account Locked, too many attempts, try again in 10 minutes', false);
            }
            $credentials = request(['email', 'password']);
            if (! Auth::attempt($credentials)) {
                $this->incrementLoginAttempts($request);

                return formatResponse(401, 'Oh Snap! An error occured. Invalid credentials.', false);
            }
            $user = $request->user();

            if ($user->status == '-1') {
                return formatResponse(401, 'Oh Snap! User account is either suspended or invalid.', false);
            } elseif (is_null($user->email_verified_at)) {
                return formatResponse(401, 'Oh Snap! An error occured. Please check your mailbox to confirm your email address to proceed!', false);
            } elseif ($user->status == '0') {
                return formatResponse(401, 'Oh Snap! Application Under Review.', false);
            } else {
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                if ($request->remember_me) {
                    $token->expires_at = Carbon::now()->addHours(24);
                }
                $token->save();

                $user_roles = $user->roles->makeHidden(['id','description','pivot','level','slug','created_at','updated_at','deleted_at']);

                return response()->json([
                    'success' => true,
                    'status_code' => 200,
                    'user' => $user,
                    'user_roles' => $user_roles,
                    'access_token' => $tokenResult->accessToken,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
                ], 200);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * Register api.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Post(
     *       path="/learners/register",
     *      operationId="createLearner",
     *      tags={"Learners"},
     *      summary="Authority: Any | Create a new learner",
     *      description="Creates a new learner account",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateLearnerRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Learner account created successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Learner")
     *      ),
     *      @OA\Response(
     *          response="400",
     *          description="Bad Request",
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateLearnerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function register(CreateLearnerRequest $request)
    {
        try {
            $input = $request->validated();

            DB::transaction(function () use ($input, &$user) {
                $user = User::create([
                    'first_name' => ucwords($input['first_name']),
                    'last_name' => ucwords($input['last_name']),
                    'phone_number' => $input['phone_number'],
                    'email' => $input['email'],
                    'password' => bcrypt($input['password'])
                ]);

                $role = Role::where('name', '=', 'User')->first();
                $user->attachRole($role);
                $user->sendEmailVerificationNotification();

                $input['user_id'] = $user->id;
                $profile = LearnerProfile::create($input);
            });

            $user_roles = $user->roles;

            $success['first_name'] = $user->first_name;
            $success['last_name'] = $user->last_name;
            $success['email'] = $user->email;
            $success['phone_number'] = $user->phone_number;
            $success['user_roles'] = $user_roles->makeHidden(['id','description','pivot','level','slug','created_at','updated_at','deleted_at']);
            $success['token'] = $user->createToken('Personal Access Token')->accessToken;

            return formatResponse(201, 'Learner Account Created Successfully.', true, $success);

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * @OA\Post(
     *       path="/instructors/register",
     *      operationId="createInstructor",
     *      tags={"Instructors"},
     *      summary="Authority: Any | Create a new instructor",
     *      description="Creates a new instructor account",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/CreateInstructorRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Instructor account created successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Instructor")
     *      ),
     *      @OA\Response(
     *          response="400",
     *          description="Bad Request",
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="The given data was invalid.",
     *      ),
     *    )
     *
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CreateInstructorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function instructorRegister(CreateInstructorRequest $request)
    {
        try {
            $input = $request->validated();
            $password = str_random(8);

            DB::transaction(function () use ($input, $password, &$user, &$profile) {
                $user = User::create([
                    'first_name' => ucwords($input['first_name']),
                    'last_name' => ucwords($input['last_name']),
                    'phone_number' => $input['phone_number'],
                    'email' => $input['email'],
                    'password' => bcrypt($password),
                    'category' => 'INS',
                    'status' => '0'
                ]);

                $role = Role::where('name', '=', 'Instructor')->first();
                $user->attachRole($role);
                $user->sendEmailVerificationNotification();

                $input['user_id'] = $user->id;

                /*if (! empty($input['image'])) {
                    $uploader = $input['image']->storeOnCloudinary('Questence-Passports');
                    $input['image_url'] = $uploader->getSecurePath();
                }
                */
                $profile = InstructorProfile::create($input);
                LearnerProfile::create($input);
            });

            $user_role = interpreteUserCategory($user->category);

            $success['first_name'] = $user->first_name;
            $success['last_name'] = $user->last_name;
            $success['email'] = $user->email;
            $success['phone_number'] = $user->phone_number;
            $success['gender'] = $profile->gender;
            $success['date_of_birth'] = $profile->date_of_birth;
            $success['user_role'] = $user_role;

            try {
                Mail::to($user->email)->send(new InstructorWelcome($user));
            } catch (\Exception $e) {
                Log::error('Instructor account created successfully, but unable to send email to User. Please check your network connectivity.');
            }

            return formatResponse(201, 'Instructor Account Created Successfully.', true, $success);

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * Logout user (Revoke the token).
     *
     * @return [string] message
     */

    /**
     * @OA\Post(
     *     path="/auth/logout",
     *     tags={"Auth"},
     *     summary="Authority: Any | Logout the currently logged in user",
     *     description="Revokes token",
     *     @OA\Response(response="200", description="User Logged out successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed")
     * )
     */
    public function logout(Request $request)
    {
        try {
            $token = $request->user()->token();
            $token->revoke();
            // $request->user()->token()->revoke();
            return formatResponse(200, 'User logged out successfully.', true);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }
}
