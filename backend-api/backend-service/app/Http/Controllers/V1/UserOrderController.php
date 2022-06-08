<?php

namespace App\Http\Controllers\V1;

use Illuminate\Http\Request;
use App\Models\CoursePayment;
use App\Models\BundlePayment;
use App\Services\V1\UserOrder;
use Illuminate\Routing\Controller;

class UserOrderController extends Controller
{
  public $userOrder;

  public function __construct(UserOrder $userOrderService)
  {
      $this->$userOrder = $userOrderService;
  }

  /**
   * @OA\Get(
   *       path="/course/orders",
   *      operationId="getCourseOrders",
   *      tags={"Orders"},
   *      summary="Authority: Superadmin | Gets all courses purchased by user",
   *      description="Retrieves all completed purchases of authenticated user",
   *      @OA\Response(
   *          response=200,
   *          description="Purchased courses retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/UserOrder")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function purchasedCourses()
  {
      return $this->userOrder->fetchAllPurchasedCourses();
  }

  /**
     * @OA\Get(
     *     path="/course/order/{id}",
     *     operationId="getCourseOrderByID",
     *     tags={"Orders"},
     *     summary="Authority: Any | Get details of a Course Order",
     *     description="Details of the specified Order",
     *     @OA\Response(
     *        response=200,
     *        description="Order details retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/UserOrder")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getCourseOrder($id)
    {
        return $this->userOrder->fetchOneCourseOrder($id);
    }

    /**
       * @OA\Get(
       *     path="/retrieve/course/order/{payment_reference}",
       *     operationId="getCourseOrderByReference",
       *     tags={"Orders"},
       *     summary="Authority: Any | Get details of a Course Order",
       *     description="Details of the specified Order",
       *     @OA\Response(
       *        response=200,
       *        description="Order details retrieved successfully",
       *        @OA\JsonContent(ref="#/components/schemas/UserOrder")
       *     ),
       *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
       *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
       *     @OA\Response(response="404", description="Resource not found")
       * )
       */
      public function getCourseOrderByReference($payment_reference)
      {
          return $this->userOrder->fetchCourseOrderByReference($payment_reference);
      }

  /**
   * @OA\Get(
   *       path="/bundle/orders",
   *      operationId="getBundleOrders",
   *      tags={"Orders"},
   *      summary="Authority: Superadmin | Gets all bundles purchased by user",
   *      description="Retrieves all completed purchases of authenticated user",
   *      @OA\Response(
   *          response=200,
   *          description="Purchased bundles retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/UserOrder")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function purchasedBundles()
  {
      return $this->userOrder->fetchAllPurchasedBundles();
  }

  /**
     * @OA\Get(
     *     path="/course/bundle/{id}",
     *     operationId="getBundleOrder",
     *     tags={"Orders"},
     *     summary="Authority: Any | Get details of an Bundle Order",
     *     description="Details of the specified Order",
     *     @OA\Response(
     *        response=200,
     *        description="Order details retrieved successfully",
     *        @OA\JsonContent(ref="#/components/schemas/UserOrder")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found")
     * )
     */
    public function getBundleOrder($id)
    {
        return $this->userOrder->fetchOneBundleOrder($id);
    }

    /**
       * @OA\Get(
       *     path="/retrieve/bundle/order/{payment_reference}",
       *     operationId="getBundleOrderByReference",
       *     tags={"Orders"},
       *     summary="Authority: Any | Get details of a Bundle Order",
       *     description="Details of the specified Order",
       *     @OA\Response(
       *        response=200,
       *        description="Order details retrieved successfully",
       *        @OA\JsonContent(ref="#/components/schemas/UserOrder")
       *     ),
       *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
       *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
       *     @OA\Response(response="404", description="Resource not found")
       * )
       */
      public function getBundleOrderByReference($payment_reference)
      {
          return $this->userOrder->fetchBundleOrderByReference($payment_reference);
      }

}
