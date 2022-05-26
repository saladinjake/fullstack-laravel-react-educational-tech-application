<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Mail\SendMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    /**
     * @OA\Post(
     *       path="/auth/reset-password-request",
     *      operationId="passwordReset",
     *      tags={"Auth"},
     *      summary="Sends user a password reset email",
     *      description="Sends user a password reset email",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              required={"email"},
     *              @OA\Property(property="email", type="string", format="email", example="ejalee@outlook.com")
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Kindly check your inbox, we have sent a password reset link."
     *       ),
     *      @OA\Response(
     *          response=404,
     *          description="Email does not exist.",
     *      ),
     *    )
     *
     * @return \Illuminate\Http\Response
     */
    public function sendPasswordResetEmail(Request $request)
    {
        if (! $this->validEmail($request->email)) {
            return response()->json([
                'success' => false,
                'message' => 'Email does not exist. Please provide a valid email.',
            ], 404);
        } else {
            $this->sendMail($request->email);

            return response()->json([
                'success' => true,
                'message' => 'Kindly check your inbox, we have sent a password reset link.',
            ], 200);
        }
    }

    /**
     * Dispatches email to user.
     *
     * @param string $email
     * @return void
     */
    public function sendMail($email)
    {
        $token = $this->generateToken($email);

        try {
            Mail::to($email)->send(new SendMail($token, $email));
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Password reset link not sent, please check your network connectivity.',
            ], 503);
        }
    }

    /**
     * Validates that user's email exists.
     *
     * @param string $email
     * @return App\Models\User
     */
    public function validEmail($email)
    {
        return (bool) User::where('email', $email)->first();
    }

    /**
     * Generates a token for password reset.
     *
     * @param string $email
     * @return string
     */
    public function generateToken($email)
    {
        $isOtherToken = DB::table('password_resets')->where('email', $email)->first();

        $token = Str::random(64);
        $this->storeToken($token, $email);

        return $token;
    }

    /**
     * Inserts generated token into password resets table.
     *
     * @param string $token
     * @param string $email
     * @return void
     */
    public function storeToken($token, $email)
    {
        DB::table('password_resets')->updateOrInsert(
            ['email' => $email],
            ['token' => bcrypt($token),
            'created_at' => Carbon::now(),
            ]);
    }
}
