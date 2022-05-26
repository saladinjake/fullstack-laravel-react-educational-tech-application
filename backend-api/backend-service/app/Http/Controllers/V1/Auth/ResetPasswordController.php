<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Support\Facades\Notification;
use App\Notifications\PasswordResetNotification;


class ResetPasswordController extends Controller
{
  public function showResetView(Request $request) {
    $validToken = $this->checkToken($request->token, $request->email);
    if(!$validToken) {
      return redirect('/reset/password')->with([
        'error' => "Invalid or expired email token"
      ], 404);
    }
    return redirect('/reset/password')->with([
      'token' => $request->token,
      'email' => $request->email
    ], 200);
  }

  public function checkToken($token,$email)
{
    $password_resets = DB::table('password_resets')->where('email', $email)->first();

    if ($password_resets && Hash::check($token, $password_resets->token)) {
        $createdAt = Carbon::parse($password_resets->created_at);
        if (!Carbon::now()->greaterThan($createdAt->addMinutes(config('auth.passwords.users.expire')))) {
            return true;
        }
    }

    return false;
}

  /**
   * @OA\Post(
   *     path="/auth/password/reset",
   *     operationId="ResetPassword",
   *     tags={"Auth"},
   *     summary="Resets a user's password",
   *     description="Resets a user's password",
   *     @OA\RequestBody(
   *         @OA\MediaType(
   *             mediaType="application/json",
   *             @OA\Schema(
   *               required={"email", "token", "password", "password_confirmation"},
   *                @OA\RequestBody(
   *                    required=true,
   *                    content="application/json",
   *                 ),
   *                  @OA\Property(
   *                      property="email",
   *                      type="string",
   *                  ),
   *                  @OA\Property(
   *                      property="token",
   *                      type="string",
   *                  ),
   *                  @OA\Property(
   *                      property="password",
   *                      type="string",
   *                  ),
   *                  @OA\Property(
   *                      property="password_confirmation",
   *                      type="string",
   *                  ),
   *              example={"email":"ejalee@outlook.com", "token":"ClRIsugfJCVLuQSnr", "password":"password", "password_confirmation":"password"}
   *             )
   *         )
   *     ),
   *     @OA\Response(response="200", description="Password updated successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
   * )
   * @return \Illuminate\Http\Response
   */
  public function reset(ResetPasswordRequest $request) {
    $data = $request->validated();
    $user = User::where('email', $data['email'])->first();
    if(!$user) {
      return response()->json([
          'success' => false,
          'message' => 'User with email does not exist.',
      ], 404);
    }

    $validToken = $this->checkToken($data['token'], $data['email']);

    if(!$validToken) {
      return redirect('/reset/password')->with([
        'error' => "Invalid or expired email token"
      ], 404);
    }
        $user->password = Hash::make($data['password']);
        $user->save();
        $this->sendNotification($user);

    return response()->json([
        'success' => true,
        'message' => 'Password has been changed successfully',
    ], 200);
  }

  public function sendNotification($user)
  {
      $notif = [
        'greeting' => "$user->first_name,",
        'body' => "Your password has been updated successfully",
        'thanks' => '',
        'actionText' => 'View',
        'actionURL' => url('/profile'),
        'user_id' => $user->id
      ];
      try {
      return Notification::send($user, new PasswordResetNotification($notif));
    } catch (\Exception $e) {
        Log::error('Password updated successfully, but unable to send Notification to User. Please check your network connectivity.');
    }
  }

}
