<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Notification;

class NotificationController extends Controller
{
  /**
   * @OA\Get(
   *     path="/notifications",
   *     tags={"Notifications"},
   *     summary="Authority: Superadmin | Admin | Instructor | Business | User | Fetch all notifications",
   *     @OA\Response(response="200", description="List of all notifications returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   * )
   */
  public function allNotifications() {
    $notifications = auth()->user()->notifications();
    return response()->json([
       'success' => true,
       'message' => $notifications->count().'found',
       'data' => $notifications->get()
   ], 200);
  }

  /**
   * @OA\Get(
   *     path="/notifications/unread",
   *     tags={"Notifications"},
   *     summary="Authority: Superadmin | Admin | Instructor | Business | User | Fetch all unread notifications",
   *     @OA\Response(response="200", description="List of all unread notifications returned"),
   *     @OA\Response(response="401", description="Unauthenticated. Token Needed."),
   * )
   */
  public function unreadNotifications() {
    $notifications = auth()->user()->unreadNotifications();
    return response()->json([
       'success' => true,
       'message' => $notifications->count().'found',
       'data' => $notifications->get()
   ], 200);
  }

}
