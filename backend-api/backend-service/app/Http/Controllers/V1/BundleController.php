<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBundleRequest;
use App\Models\InstructorProfile;
use App\Models\BusinessProfile;
use App\Models\User;
use App\Models\Course;
use App\Models\Bundle;
use Illuminate\Support\Str;
use App\Notifications\BundleCreationNotification;
use App\Notifications\BundleStatusNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Http\Request;

class BundleController extends Controller
{
  public function __construct()
  {
      $this->middleware('auth');
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */

  /**
   * @OA\Get(
   *     path="/bundles",
   *     tags={"Bundles"},
   *     summary="Authority: SuperAdmin | Fetch all bundles",
   *     @OA\Response(response="200", description="List of all bundles returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function index()
  {
      $bundles = Bundle::with('courses', 'instructor')->orderby('name', 'asc')->get();
      $counter = $bundles->count();
      $message = $counter.' item(s) returned';

      return response()->json([
            'success' => true,
            'message' => $message,
            'data' => [
                'courses' => $bundles,
                'counter' => $counter,
            ],
        ], 200);
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */

  /**
   * @OA\Get(
   *     path="/bundles/mybundles",
   *     tags={"Instructors"},
   *     summary="Authority: Instructor | Fetch all bundles for a particular Instructor",
   *     @OA\Response(response="200", description="List of all bundles returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function myList()
  {
    $user = User::with('instructorProfile')->find(Auth::id());
    if (is_null($user)) {
        return response()->json([
            'error' => 'User does not exist',
        ], 404);
    } else {
        $bundles = Bundle::with('courses', 'instructor')->where('instructor_id', $user->instructorProfile->id)->get();
        $counter = $bundles->count();

        return response()->json([
        'success' => true,
        'message' => 'Bundles Retrieved Successfully.',
        'data' => [
          'bundles' => $bundles,
          'counter' => $counter
          ]
    ], 200);
    }
  }

  /**
   * @OA\Get(
   *     path="/bundles/activeBundles",
   *     tags={"Bundles"},
   *     summary="Authority: SuperAdmin | Fetch all active bundles",
   *     @OA\Response(response="200", description="List of all active bundles is returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function activeBundles()
  {
      $active_bundles = Bundle::with('courses', 'instructor')->where('status', '1')->get();
      $counter = $active_bundles->count();
      $message = $counter.' Active Bundles Retrieved Successfully';
      if (count($active_bundles) < 1) {
          return response()->json([
           'message' => 'No Active Bundles',
       ], 200);
      } else {
          return response()->json([
        'success' => true,
        'message' => $message,
        'data' => [
            'bundles' => $active_bundles,
            'counter' => $counter,
        ],
    ], 200);
      }
  }

  /**
   * @OA\Get(
   *     path="/bundles/deactivatedBundles",
   *     tags={"Bundles"},
   *     summary="Authority: SuperAdmin | Fetch all deactivated Bundles",
   *     @OA\Response(response="200", description="List of all deactivated Bundles is returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */

  public function deactivatedCourses()
  {
      $deactivated_bundles = Bundle::with('courses', 'instructor')->where('status', '-1')->get();
      $counter = $deactivated_bundles->count();
      $message = $counter.' Deactivated Bundles Retrieved Successfully';
      if (count($deactivated_bundles) < 1) {
          return response()->json([
          'message' => 'No Deactivated Bundles',
      ], 200);
      } else {
          return response()->json([
       'success' => true,
       'message' => $message,
       'data' => [
           'bundles' => $deactivated_bundles,
           'counter' => $counter,
       ],
   ], 200);
      }
  }

  /**
   * @OA\Get(
   *     path="/bundles/{bundleId}",
   *     tags={"Bundles"},
   *     summary="Authority: SuperAdmin |  Get details of a particular Bundle",
   *     description="Bundle ID is compulsory",
   *     @OA\Parameter(
   *        name="id",
   *        description="ID of the bundle",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Bundle details retrieved successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function show($bundle_id)
  {
      $bundle = Bundle::with('courses', 'instructor')->find($bundle_id);
      if (is_null($bundle)) {
          return response()->json([
              'error' => 'Bundle does not exist',
          ], 404);
      } else {
          return response()->json([
          'success' => true,
          'message' => 'Bundle Retrieved Successfully.',
          'data' => $bundle
      ], 200);
      }
  }

  /**
   * @OA\Get(
   *     path="/bundles/mybundles/{bundleId}",
   *     tags={"Instructors"},
   *     summary="Authority: Instructor |  Get details of a particular Bundle",
   *     description="Bundle ID is compulsory",
   *     @OA\Parameter(
   *        name="id",
   *        description="ID of the bundle",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Bundle details retrieved successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function getBundle($bundle_id)
  {
    $user = User::with('InstructorProfile')->find(Auth::id());
    if (is_null($user)) {
        return response()->json([
            'error' => 'User does not exist',
        ], 404);
    }
    else {
        $bundle = Bundle::with('courses', 'instructor')->where('instructor_id', $user->instructorProfile->id)->get();
        $counter = $bundle->count();
        return response()->json([
        'success' => true,
        'message' => 'Bundle Retrieved Successfully.',
        'data' => [
          'bundles' => $bundle,
          'counter' => $counter
        ]
    ], 200);
    }
  }

  /**
   * @OA\Post(
   *     path="/bundles/create",
   *     tags={"Instructors"},
   *     summary="Authority: Instructor | Create a Bundle",
   *     description="Required fields are highlighted",
   *     @OA\RequestBody(
   *         @OA\MediaType(
   *             mediaType="application/json",
   *             @OA\Schema(
   *               required={"name", "description"},
   *                @OA\RequestBody(
   *                    required=true,
   *                    content="application/json",
   *                 ),
   *                 @OA\Property(
   *                     property="name",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="description",
   *                     type="string",
   *                 ),
   *                 @OA\Property(
   *                     property="price",
   *                     type="string",
   *                 ),
   *                 example={"name":"Life Cheat Code", "description":"Lorem Ipsum", "price":"5000"}
   *             )
   *         )
   *     ),
   *     @OA\Response(response="200", description="Bundle created successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
   * )
   */
  public function create(Request $request)
  {
    $this->validate($request, [
        'name' => 'required|string|min:5|max:255|unique:bundles',
        'description' => 'required|string|max:255',
        'price' => 'nullable|string',
        'total' => 'required|string',
        'business_id' => 'nullable|integer'
    ],
    [
      'name.unique' => 'A bundle with this name already exists.',
      'total.required' => 'Select a few courses',
    ]);

    $user = User::find(Auth::id());
    $instructor = $user->instructorProfile->id;
    $business_id;
    if($request->business_id == null) {
      $business_id = '1';
    }
    else {
      $business_id = $request->business_id;
    }
    $price;
    $discountIncrease;
    if($request->price !== null) {
      $price = $request->price;
      $discountIncrease = $this->calculateDiscountIncrease($request->price, $request->total);
    }
    else {
      $price = $request->total;
    }

    $bundle = new Bundle;
    $bundle->name                = $request->name;
    $bundle->slug                = Str::slug($request->name, '-');
    $bundle->description         = $request->description;
    $bundle->price               = $price;
    $bundle->instructor_id       = $instructor;
    $bundle->business_id         = $business_id;
    $bundle->discountIncrease    = $discountIncrease;
    $bundle->save();
    try {
      $courses = Course::find([$course_ids]);
      $bundle->courses()->attach($courses);
      $message = 'Bundle Created';
      $this->sendNotification(Auth::id(), $bundle->id, $bundle->name);
      return response()->json([
         'success' => true,
         'message' => $message,
         'data' => $bundle,
     ], 200);
    } catch (Exception $e) {
        return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
    }
  }


    /**
     * @OA\Put(
     *     path="/bundles/bundleId",
     *     tags={"Instructors"},
     *     summary="Authority: Instructor | Update a particular Bundle | Please use x-www-form-urlencoded for body",
     *     @OA\Parameter(
     *        name="id",
     *        description="Bundle ID",
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
     *                     property="name",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string",
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="string",
     *                 ),
     *                 example={"name":"Life Cheat Code", "description":"Lorem Ipsum", "price":"5000"}
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Bundle updated successfully"),
     *     @OA\Response(response="401", description="Unauthenticated. Token Needed.")
     * )
     */
    public function update(Request $request)
    {
      $user = User::find(Auth::id());
      $instructor = $user->instructorProfile->id;

      $this->validate($request, [
          'name' => 'string|max:255|unique:bundles,instructor_id,'.$instructor,
          'description' => 'string|max:255',
          'price' => 'string',
      ],
      [
        'name.unique' => 'A bundle with this name already exists.'
      ]);

      $price;
      $discountIncrease;
      if($request->price !== null) {
        $price = $request->price;
        $discountIncrease = $this->calculateDiscountIncrease($request->price, $request->total);
      }
      else {
        $price = $request->total;
      }
      $bundle = Bundle::findOrFail($request->id);
      $bundle->update([
        'name'  => $request->name,
        'slug'  => Str::slug($request->name, '-'),
        'description'  => $request->description,
        'price'  => $request->price,
        'discountIncrease' => $discountIncrease,
      ]);

         return response()->json([
           'success' => true,
           'message' => 'Bundle Updated Successfully',
           'data' => $bundle,
       ], 200);
    }

  public function sendNotification($user_id, $bundle_id, $name)
  {
      $user = User::find($user_id);
      $notif = [
              'greeting' => 'Congratulations',
              'body' => "You have successfully created '$name'.",
              'thanks' => 'Pending Review',
              'actionText' => 'View Bundle',
              'actionURL' => url("/bundles/mybundles/$bundle_id"),
              'bundle_id' => $bundle_id,
              'user_id' => $user_id,
          ];
      try {
          Notification::send($user, new BundleCreationNotification($notif));
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function calculateDiscountIncrease($price, $total) {
    if($price < $total) {
      $decrease = $total - $price;
      $discount = ($decrease/$total) * 100;
      $discount_text = $discount.'% off';
      return $discount_text;
    }
    elseif($price > $total) {
      $increase = $price - $total;
      $inc = ($increase/$total) * 100;
      $increase_text = $discount.'% increase';
      return $increase_text;
    }
    else {
      return $total;
    }
  }

  /**
   * @OA\Put(
   *     path="/bundles/{bundleId}/activate",
   *     tags={"Bundles"},
   *     summary="Authority: SuperAdmin | Activate a Bundle",
   *     @OA\Parameter(
   *        name="BundleId",
   *        description="ID of the Bundle",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Bundle Activated successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function activate($bundle_id)
  {
      $bundle = Bundle::with('courses', 'instructor')->find($bundle_id);
      if (is_null($bundle)) {
          return response()->json([
                 'error' => 'Bundle does not exist',
             ], 404);
      } else {
          $bundle->status = '1';
          $bundle->save();
          $message = 'Bundle has been activated';

          $this->sendConfirmationNotification($bundle->instructor_id, $bundle_id, $bundle->name, $bundle->status);

          return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $bundle,
        ], 200);
      }
  }

  /**
   * @OA\Put(
   *     path="/bundles/{bundleId}/deactivate",
   *     tags={"Bundles"},
   *     summary="Authority: SuperAdmin | Deactivate a Bundle",
   *     @OA\Parameter(
   *        name="BundleId",
   *        description="ID of the Bundle",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Bundle Deactivated successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function deactivate($bundle_id)
  {
      $bundle = Bundle::with('courses', 'instructor')->find($bundle_id);
      if (is_null($bundle)) {
          return response()->json([
                  'error' => 'Bundle does not exist',
              ], 404);
      } else {
          $bundle->status = '-1';
          $bundle->save();
          $message = 'Bundle has been Deactivated';

          $this->sendConfirmationNotification($bundle->instructor_id, $bundle_id, $bundle->name, $bundle->status);

          return response()->json([
             'success' => true,
             'message' => $message,
             'data' => $bundle,
         ], 200);
      }
  }

  public function sendConfirmationNotification($instructor, $bundle_id, $bundle_name, $status)
  {
     if($status == '1') {
      $instructor = InstructorProfile::find($instructor);
      $notif = [
              'greeting' => 'Dear'. $instructor->user->first_name,
              'body' => "Your previously created bundle: '$bundle_name' has been approved",
              'thanks' => 'Congratulations',
              'actionText' => 'View Bundle',
              'actionURL' => url("/mybundles/$bundle_id"),
              'bundle_id' => $bundle_id,
              'instructor_id' => $instructor->id,
          ];
      try {
          Notification::send($instructor->user, new BundleStatusNotification($notif));
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }
    elseif($status == '-1') {
      $instructor = InstructorProfile::with('user')->find($instructor);
      $notif = [
              'greeting' => 'Dear'. $instructor->user->first_name,
              'body' => "Your previously created bundle: '$bundle_name' has been disapproved",
              'thanks' => 'Pending further review.',
              'actionText' => 'View Bundle',
              'actionURL' => url("/mybundles/$bundle_id"),
              'bundle_id' => $bundle_id,
              'instructor_id' => $instructor->id,
          ];
      try {
          Notification::send($instructor->user, new BundleStatusNotification($notif));
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }
    else {
      return response()->json([
                'error' => 'Cannot detect Bundle status',
          ], 500);
    }
  }


  /**
   * @OA\Delete(
   *     path="/bundles/{id}/delete",
   *     tags={"Bundles"},
   *     summary="Authority: SuperAdmin | Instructor | Delete a Bundle",
   *     @OA\Parameter(
   *        name="Id",
   *        description="ID of the bundle",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(response="200", description="Bundle deleted successfully"),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role")
   * )
   */
  public function destroy($bundle_id)
  {
      $bundle = Bundle::find($bundle_id);
      if (is_null($bundle)) {
          return response()->json([
            'error' => 'Bundle does not exist',
        ], 404);
      } else {
          $bundle->delete();

          return response()->json([
            'success' => true,
            'message' => 'Bundle Deleted Successfully',
            'data' => $bundle,
        ], 200);
      }
  }

}
