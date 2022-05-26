<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserWelcome;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class ApiVerificationController extends Controller
{
    use VerifiesEmails;

    /**
     * Mark the authenticated user’s email address as verified.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
    */

    public function verify(Request $request) {
        if (!$request->hasValidSignature()) {
        return formatResponse(401, 'Invalid Verification token.', false);
    }
      $userId = $request['userId'];
      $user = User::findOrFail($userId);
      if($user) {
          if($user->hasVerifiedEmail()) {
          return redirect(config('app.frontend').'/login');
        }
      $user->email_verified_at = Carbon::now();
      $user->save();
      try {
          Mail::to($user->email)->send(new UserWelcome($user));
      } catch (\Exception $e) {
          Log::error('User account created successfully, but unable to send email to User. Please check your network connectivity.');
      }
      return redirect(config('app.frontend').'/login');
    }
      return response()->json([
            'success' => false,
            'message' => "User does not exist",
            'data' => [],
        ], 404);
      /* return response()->json([
            'success' => true,
            'message' => "Email Verified",
            'data' => [
                'user' => $user
            ],
        ], 200);
        */
    }

    /**
     * Resend the email verification notification.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
    */

    /**
     * @OA\Get(
     *     path="/email/verification/resend",
     *     tags={"Auth"},
     *     summary="Authority: Any | Resend Verification link",
     *     @OA\Response(response="200", description="Verification link is sent"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function resend()
    {
    if (Auth::user()->hasVerifiedEmail()) {
      return response()->json([
          'error' => 'Email is already verified',
      ], 422);
    }
     Auth::user()->sendEmailVerificationNotification();
     return response()->json([
           'success' => true,
           'message' => "Verification link sent"
       ], 200);
    }
}
