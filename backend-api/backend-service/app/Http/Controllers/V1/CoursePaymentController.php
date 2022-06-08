<?php

namespace App\Http\Controllers\V1;

use Illuminate\Http\Request;
use App\Models\CoursePayment;
use App\Services\V1\PaymentService;
use App\Http\Requests\CreateCheckoutRequest;
use Illuminate\Routing\Controller;

class CoursePaymentController extends Controller
{
  public $coursePayment;

  public function __construct(PaymentService $coursePaymentService)
  {
      $this->coursePayment = $coursePaymentService;
  }

  /**
   * @OA\Get(
   *       path="/courses/payments",
   *      operationId="getCoursePayments",
   *      tags={"Payments"},
   *      summary="Authority: Superadmin | Gets all course payments",
   *      description="Retrieves all users' course payments",
   *      @OA\Response(
   *          response=200,
   *          description="Course payments retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/CoursePayment")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function index()
  {
      return $this->coursePayment->fetchAllCoursePayments();
  }

  /**
   * @OA\Post(
   *       path="/checkout",
   *      operationId="checkout",
   *      tags={"Checkout"},
   *      summary="Authority: Learner | Checkout courses and bundles",
   *      description="Checkout one or more courses and bundles from your cart",
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/CreateCheckoutRequest")
   *      ),
   *      @OA\Response(
   *          response=201,
   *          description="Checkout successful",
   *      ),
   *      @OA\Response(
   *          response="403",
   *          description="Unauthorized. User not with access role",
   *      ),
   *      @OA\Response(
   *          response=422,
   *          description="The given data was invalid.",
   *      ),
   *    )
   *
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\CreateCheckoutRequest $request
   * @return \Illuminate\Http\Response
   */
  public function checkout(CreateCheckoutRequest $request)
  {
      return $this->coursePayment->checkout($request->validated());
  }

  /**
   * @OA\Get(
   *       path="/courses/pending/payments",
   *      operationId="getCoursePendingPayments",
   *      tags={"Payments"},
   *      summary="Authority: Superadmin | Gets all pending course payments",
   *      description="Retrieves all pending course payments",
   *      @OA\Response(
   *          response=200,
   *          description="Pending course payments retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/CoursePayment")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function pendingPayments()
  {
      return $this->coursePayment->pendingCoursePayments();
  }

  /**
   * @OA\Get(
   *       path="/courses/failed/payments",
   *      operationId="getCourseFailedPayments",
   *      tags={"Payments"},
   *      summary="Authority: Superadmin | Gets all failed course payments",
   *      description="Retrieves all failed course payments",
   *      @OA\Response(
   *          response=200,
   *          description="Failed course payments retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/CoursePayment")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function failedPayments()
  {
      return $this->coursePayment->failedCoursePayments();
  }

  /**
   * @OA\Get(
   *       path="/courses/successful/payments",
   *      operationId="getCourseSuccessfulPayments",
   *      tags={"Payments"},
   *      summary="Authority: Superadmin | Gets all successful course payments",
   *      description="Retrieves all successful course payments",
   *      @OA\Response(
   *          response=200,
   *          description="Successful course payments retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/CoursePayment")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function successfulPayments()
  {
      return $this->coursePayment->successfulCoursePayments();
  }

  /**
   * @OA\Get(
   *     path="/courses/payment/{id}",
   *     operationId="getCoursePayment",
   *     tags={"Payments"},
   *     summary="Authority: Any | Get details of a Payment",
   *     description="Details of the specified Payment",
   *     @OA\Response(
   *        response=200,
   *        description="Payment details retrieved successfully",
   *        @OA\JsonContent(ref="#/components/schemas/CoursePayment")
   *     ),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function show($id)
  {
      return $this->coursePayment->fetchOneCoursePayment($id);
  }

  /**
   * @OA\Get(
   *     path="/courses/retrieve/payment/{payment_reference}",
   *     operationId="getPayment",
   *     tags={"Payments"},
   *     summary="Authority: Any | Get details of a Payment",
   *     description="Details of the specified Payment reference",
   *     @OA\Response(
   *        response=200,
   *        description="Payment details retrieved successfully",
   *        @OA\JsonContent(ref="#/components/schemas/CoursePayment")
   *     ),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function getPayment($payment_reference)
  {
      return $this->coursePayment->fetchCoursePayment($payment_reference);
  }

  public function handleGatewayCallback()
  {
    return $this->coursePayment->handleGatewayCallback();
  }
}
