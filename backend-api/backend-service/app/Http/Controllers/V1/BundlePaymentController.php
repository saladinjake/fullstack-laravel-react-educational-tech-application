<?php

namespace App\Http\Controllers\V1;

use Illuminate\Http\Request;
use App\Models\BundlePayment;
use App\Services\V1\PaymentService;
use Illuminate\Routing\Controller;

class BundlePaymentController extends Controller
{
  public $bundlePayment;

  public function __construct(PaymentService $bundlePaymentService)
  {
      $this->bundlePayment = $bundlePaymentService;
  }

  /**
   * @OA\Get(
   *       path="/bundles/payments",
   *      operationId="getBundlePayments",
   *      tags={"Payments"},
   *      summary="Authority: Superadmin | Gets all bundle payments",
   *      description="Retrieves all users' bundle payments",
   *      @OA\Response(
   *          response=200,
   *          description="Bundle payments retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/BundlePayment")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function index()
  {
      return $this->bundlePayment->fetchAllBundlePayments();
  }

  /**
   * @OA\Get(
   *       path="/bundles/pending/payments",
   *      operationId="getBundlePendingPayments",
   *      tags={"Payments"},
   *      summary="Authority: Superadmin | Gets all pending bundle payments",
   *      description="Retrieves all pending bundle payments",
   *      @OA\Response(
   *          response=200,
   *          description="Pending bundle payments retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/BundlePayment")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function pendingPayments()
  {
      return $this->bundlePayment->pendingBundlePayments();
  }

  /**
   * @OA\Get(
   *       path="/bundles/failed/payments",
   *      operationId="getBundleFailedPayments",
   *      tags={"Payments"},
   *      summary="Authority: Superadmin | Gets all failed bundle payments",
   *      description="Retrieves all failed bundle payments",
   *      @OA\Response(
   *          response=200,
   *          description="Failed bundle payments retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/BundlePayment")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function failedPayments()
  {
      return $this->bundlePayment->failedBundlePayments();
  }

  /**
   * @OA\Get(
   *       path="/bundles/successful/payments",
   *      operationId="getBundleSuccessfulPayments",
   *      tags={"Payments"},
   *      summary="Authority: Superadmin | Gets all successful bundle payments",
   *      description="Retrieves all successful bundle payments",
   *      @OA\Response(
   *          response=200,
   *          description="Successful bundle payments retrieved successfully",
   *          @OA\JsonContent(ref="#/components/schemas/BundlePayment")
   *      ),
   *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *      @OA\Response(response="403", description="Unauthorized. User not with access role")
   *    )
   */
  public function successfulPayments()
  {
      return $this->bundlePayment->successfulBundlePayments();
  }

  /**
   * @OA\Get(
   *     path="/bundles/payments/{id}",
   *     operationId="getBundlePayment",
   *     tags={"Payments"},
   *     summary="Authority: Any | Get details of a Payment",
   *     description="Details of the specified Payment",
   *     @OA\Response(
   *        response=200,
   *        description="Payment details retrieved successfully",
   *        @OA\JsonContent(ref="#/components/schemas/BundlePayment")
   *     ),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function show($id)
  {
      return $this->bundlePayment->fetchOneBundlePayment($id);
  }

  /**
   * @OA\Get(
   *     path="/bundles/retrieve/payment/{payment_reference}",
   *     operationId="getPayment",
   *     tags={"Payments"},
   *     summary="Authority: Any | Get details of a Payment",
   *     description="Details of the specified Payment reference",
   *     @OA\Response(
   *        response=200,
   *        description="Payment details retrieved successfully",
   *        @OA\JsonContent(ref="#/components/schemas/BundlePayment")
   *     ),
   *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
   *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
   *     @OA\Response(response="404", description="Resource not found")
   * )
   */
  public function getPayment($payment_reference)
  {
      return $this->bundlePayment->fetchBundlePayment($payment_reference);
  }
}
