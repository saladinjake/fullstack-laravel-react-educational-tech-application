<?php

namespace App\Services\V1;

use App\Models\Course;
use App\Models\Bundle;
use App\Models\CoursePayment;
use App\Models\BundlePayment;
use App\Models\UserOrder;
use App\Services\PaymentStaticService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Exception;
use DB;
use Illuminate\Support\Facades\Auth;
use App\Helpers\TransRef;
use Illuminate\Support\Facades\Mail;

class PaymentService extends PaymentStaticService
{
  /**
     * Issue Secret Key from your Paystack Dashboard
     * @var string
     */
  protected $secretKey;

  public function __construct()
    {
        $this->setKey();
    }

  public function user()
  {
      $user = Auth::user();

      return $user;
  }

  public function fetchAllCoursePayments()
  {
      try {
         $payments = CoursePayment::with('learnerProfile', 'businessProfile', 'courses')->orderby('created_at', 'asc')->get();
         if (! $payments) {
             return formatResponse(200, 'No Payment record found', true);
         } else {
             return formatResponse(200, 'Payments retrieved successfully', true, $payments);
         }
     } catch (Exception $e) {
         return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
     }
  }

  public function fetchOneCoursePayment($id)
  {
      try {
          $payment = CoursePayment::with('learnerProfile', 'businessProfile', 'courses')->where('id', $id)->first();
          if (! $payment) {
              return formatResponse(404, 'Payment doesn\'t exist!', false);
          } else {
              return formatResponse(200, 'Payment retrieved successfully', true, $payment);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function pendingCoursePayments()
  {
      try {
        $payments = CoursePayment::with('learnerProfile', 'businessProfile', 'courses')->where('status', '0')->orderby('created_at', 'asc')->get();
        if (! $payments) {
            return formatResponse(200, 'No Payment record found', true);
        } else {
            return formatResponse(200, 'Payments retrieved successfully', true, $payments);
        }
       } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function failedCoursePayments()
  {
      try {
        $payments = CoursePayment::with('learnerProfile', 'businessProfile', 'courses')->where('status', '-1')->orderby('created_at', 'asc')->get();
        if (! $payments) {
            return formatResponse(200, 'No Payment record found', true);
        } else {
            return formatResponse(200, 'Payments retrieved successfully', true, $payments);
        }
       } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function successfulCoursePayments()
  {
      try {
        $payments = CoursePayment::with('learnerProfile', 'businessProfile', 'courses')->where('status', '1')->orderby('created_at', 'asc')->get();
        if (! $payments) {
            return formatResponse(200, 'No Payment record found', true);
        } else {
            return formatResponse(200, 'Payments retrieved successfully', true, $payments);
        }
       } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function fetchCoursePayment($payment_reference)
  {
      try {
          $payment = CoursePayment::with('learnerProfile', 'businessProfile', 'courses')->where('payment_reference', $payment_reference)->first();
          if (! $payment) {
              return formatResponse(404, 'Payment doesn\'t exist!', false);
          } else {
              return formatResponse(200, 'Payment retrieved successfully', true, $payment);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function fetchBundlePayment($payment_reference)
  {
      try {
          $payment = BundlePayment::with('learnerProfile', 'businessProfile', 'bundles')->where('payment_reference', $payment_reference)->first();
          if (! $payment) {
              return formatResponse(404, 'Payment doesn\'t exist!', false);
          } else {
              return formatResponse(200, 'Payment retrieved successfully', true, $payment);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function checkout($data) {

      try {

        $order_id   = $this->getReference();
        if(!is_null($order_id)) {
        foreach ($data['checkout'] as $item) {

            $entry       = $this->checkItem($item['item_id']);
            $orderExists = $this->checkIfPurchased($item['item_id']);

            if($orderExists) {
              return formatResponse(200, 'You\'ve already purchased this course', true);
            }

            $entry_type = $this->checkType($item['item_id']);
            $checkUser  = $this->checkUser();

            if($entry_type == 1) {
              DB::beginTransaction();

                  $payment = CoursePayment::create([
                      'learner_profile_id' => ($checkUser == 1) ? $this->user()->learnerProfile->id : NULL,
                      'business_profile_id' => ($checkUser == 2) ? $this->user()->businessProfile->id : NULL,
                      'course_id' => $item['item_id'],
                      'price' => $entry->price,
                      'payment_reference' => $order_id,
                      'status' => '0'
                  ]);

              DB::commit();
            }
            elseif($entry_type == 2) {
              DB::beginTransaction();

                  $payment = BundlePayment::create([
                      'learner_profile_id' => ($checkUser == 1) ? $this->user()->learnerProfile->id : NULL,
                      'business_profile_id' => ($checkUser == 2) ? $this->user()->businessProfile->id : NULL,
                      'bundle_id' => $item['item_id'],
                      'price' => $entry->price,
                      'payment_reference' => $order_id,
                      'status' => '0'
                  ]);

              DB::commit();
            }
            else {
              return formatResponse(200, 'Course or Bundle not found', true);
            }

        }
        $total = 0;
        foreach ($data['checkout'] as $item) {

                $entry = $this->checkItem($item['item_id']);
                $price = $entry->price;
                $total += $price;
        }

        $order_detail =  [
            'custom_fields' => [
             [
               "display_name"  => "Payment ID",
               "variable_name" => "payment_id",
               "value"         => $order_id
             ],
             [
               "display_name" => "User ID",
               "variable_name" => "user_id",
               "value" => $this->user()->id
             ],
             ]
            ];

        $transaction = Http::withHeaders([
         'Authorization' => 'Bearer ' . $this->secretKey,
         'Content-Type'  => 'application/json',
         'Accept'        => 'application/json',
         'Cache-Control' => 'no-cache'
        ])->post('https://api.paystack.co/transaction/initialize', [
          'email' => $this->user()->email,
          'amount' => $total * 100,
          'quantity' => 1,
          'metadata' => $order_detail,
          'callback' => "https://platform.web/payment/callback",
          'reference' => $this->genTranxRef()
        ]);

        return $transaction;
      }
      else {
        return formatResponse(200, 'Expired Payment Reference, please try again', true);
      }

      } catch (Exception $e) {
         return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
     }
  }

  public function fetchAllBundlePayments()
  {
      try {
         $payments = BundlePayment::with('learnerProfile', 'businessProfile', 'bundles')->orderby('created_at', 'asc')->get();
         if (! $payments) {
             return formatResponse(200, 'No Payment record found', true);
         } else {
             return formatResponse(200, 'Payments retrieved successfully', true, $payments);
         }
     } catch (Exception $e) {
         return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
     }
  }

  public function fetchOneBundlePayment($id)
  {
      try {
          $payment = BundlePayment::with('learnerProfile', 'businessProfile', 'bundles')->where('id', $id)->first();
          if (! $payment) {
              return formatResponse(404, 'Payment doesn\'t exist!', false);
          } else {
              return formatResponse(200, 'Payment retrieved successfully', true, $payment);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function pendingBundlePayments()
  {
      try {
        $payments = BundlePayment::with('learnerProfile', 'businessProfile', 'bundles')->where('status', '0')->orderby('created_at', 'asc')->get();
        if (! $payments) {
            return formatResponse(200, 'No Payment record found', true);
        } else {
            return formatResponse(200, 'Payments retrieved successfully', true, $payments);
        }
       } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function failedBundlePayments()
  {
      try {
        $payments = BundlePayment::with('learnerProfile', 'businessProfile', 'bundles')->where('status', '-1')->orderby('created_at', 'asc')->get();
        if (! $payments) {
            return formatResponse(200, 'No Payment record found', true);
        } else {
            return formatResponse(200, 'Payments retrieved successfully', true, $payments);
        }
       } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function successfulBundlePayments()
  {
      try {
        $payments = BundlePayment::with('learnerProfile', 'businessProfile', 'bundles')->where('status', '1')->orderby('created_at', 'asc')->get();
        if (! $payments) {
            return formatResponse(200, 'No Payment record found', true);
        } else {
            return formatResponse(200, 'Payments retrieved successfully', true, $payments);
        }
       } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function handleGatewayCallback() {
    $transactionRef = request()->query('trxref');
    $paymentDetails = Http::withHeaders([
     'Authorization' => 'Bearer ' . $this->secretKey,
     'Content-Type'  => 'application/json',
     'Accept'        => 'application/json',
     'Cache-Control' => 'no-cache'
    ])->get("https://api.paystack.co/transaction/verify/{$transactionRef}", [
    ]);
    return formatResponse(200, 'Payments successful', true, $paymentDetails->json());
  }

  public function checkItem($item)
  {
    $course = Course::where(['id' => $item])->first();
    if(is_null($course)) {
      $bundle = Bundle::where(['id' => $item])->first();
      return $bundle;
    }
    return $course;
  }

  public function checkIfPurchased($item) {
    $order_course = UserOrder::where('course_id', $item)->orWhere('bundle_id', $item)->first();
    if($order_course)
    return true;
  }

  public function checkType($item)
  {
    $course = Course::where(['id' => $item])->first();
    if(is_null($course)) {
      $bundle = Bundle::where(['id' => $item])->first();
      return 2;
    }
    return 1;
  }

  public function checkUser() {
    if(!is_null($this->user()->learnerProfile)) {
      return 1;
    }
    elseif(!is_null($this->user()->businessProfile)) {
      return 2;
    }
    else {
      return null;
    }
  }

  public function getReference() {
    $reference = $this->genTranxRef();
    $ref_course = CoursePayment::where(['payment_reference' => $reference])->first();
    $ref_bundle = BundlePayment::where(['payment_reference' => $reference])->first();
    if(is_null($ref_course) && is_null($ref_bundle)) {
      return $reference;
    }
    return null;
  }

  public function genTranxRef()
  {
      return TransRef::getHashedToken();
  }

  /**
   * Get secret key from Paystack config file
   */
  public function setKey()
  {
      $this->secretKey = env('PAYSTACK_SECRET_KEY');
  }
}
