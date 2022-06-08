<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * @OA\Post(
     *     path="/auth/update-password",
     *     tags={"Auth"},
     *     summary="Authority: Any | Update currently logged in user password",
     *     description="All fields are compulsory",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                  required={"current_password", "password", "password_confirmation"},
     *                @OA\RequestBody(
     *                    required=true,
     *                    content="application/json",
     *                 ),
     *                 @OA\Property(
     *                     property="current_password",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                  @OA\Property(
     *                     property="password_confirmation",
     *                     type="string"
     *                 ),
     *                 example={"current_password":"User current password","password":"User new password",
     *                      "password_confirmation":"Re-enter new password"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Password updated successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
     * )
     */
    public function changePassword(UpdatePassword $request)
    {
        try {
            $this->user = Auth::user();
            $validated = $request->validated();

            DB::beginTransaction();

            $data = $request->all();
            $data['password'] = bcrypt($data['password']);
            $this->user->update($data);

            DB::commit();

            return formatResponse(200, 'Password updated successfully.', true);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * Logged In User Details.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *     path="/auth/me",
     *     tags={"Users"},
     *     summary="Authority: Any | Get Details of the currently Authenticated user",
     *     description="User account details",
     *     @OA\Response(response="200", description="User profile is returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
     * )
     */
    public function userDetails(Request $request)
    {
        try {
            $user = Auth::user();
            $role = Auth::user()->roles->makeHidden(['id','description','pivot','level','slug','created_at','updated_at','deleted_at']);

            return formatResponse(200, 'User details retrieved successfully.', true, $user);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * @OA\Get(
     *     path="/auth/my/info",
     *     tags={"Users"},
     *     summary="Authority: Any | Get info of the currently Authenticated user",
     *     description="User First Name, Last name, Business Name and Image",
     *     @OA\Response(response="200", description="User info is returned"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
     * )
     */
    public function userInfo() {
      try {
        $user = User::find(Auth::id());
         if($user->hasRole('user') || $user->hasRole('instructor') || $user->hasRole('admin')) {
           $data = [
                 "first_name" => $user->first_name,
                 "last_name"  => $user->last_name,
                 "image_url"  => $user->image_url
               ];
          }
         elseif($user->hasRole('business')) {
           $business = $user->instructorProfile;
           $data = [
                 "company_name" => $business->company_name,
                 "image-url"    => $business->company_logo
               ];
         }
         else {
           $data = [
                 "role" => "Cannot detect role",
               ];
         }
         return formatResponse(200, 'User details retrieved successfully.', true, $data);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * @OA\Post(
     *     path="/users/profile-photo",
     *     tags={"Users"},
     *     summary="Authority: Any | Upload Profile Photo",
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
     *                     property="image",
     *                     type="file",
     *                 ),
     *                 example={"image":"file.jpg"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Profile Photo Uploaded Successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role")
     * )
     */
    public function uploadPhoto(Request $request)
    {
        try {
            $check = User::where('id', Auth::id())->first();
            if (! $check) {
                return formatResponse(404, 'User does not exist.', false);
            } else {
                DB::beginTransaction();

                $data = $request->all();

                $validator = Validator::make($request->all(), [
                    'image' => 'required|mimes:jpg,jpeg,png|max:300|dimensions:min_width=100,min_height=100,max_width=150,max_height=150',
                ], $messages = [
                    'mimes' => 'Please insert image with jpeg/png formats only',
                    'max'   => 'Image should be less than 300 KB',
                    'dimensions' => 'Image Minimum Dimension is 100x100 and Max Dimension is 150x150',
                ]);

                if ($validator->fails()) {
                    return formatResponse(422, 'Oh Snap! An error occured.', false, $validator->errors());
                }

                $user = User::findorfail(Auth::id());

                $username = $user->first_name.'-'.$user->last_name.'-ID-'.$user->id.'-photo';

                if ($request->hasFile('image')) {
                    $cloudinary_upload = $request->file('image')->storeOnCloudinaryAs('profile-photos', $username);
                    $user->image_url = $cloudinary_upload->getSecurePath();
                    $url = $cloudinary_upload->getSecurePath();
                }
                $user->save();

                DB::commit();

                return formatResponse(200, 'Profile Photo Uploaded Successfully.', true, $url);
            }
        } catch (Exception $e) {
            DB::rollBack();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $check = User::where('id', $id)->first();
            if (! $check) {
                return formatResponse(404, 'User does not exist.', false);
            } else {
                $user = $this->model->show($id);
                $user->delete($id) and $user->trashed($id);

                return formatResponse(200, 'User account deleted successfully.', true);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }
}
