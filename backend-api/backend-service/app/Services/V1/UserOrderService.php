<?php

namespace App\Services\V1;

use App\Models\UserOrder;
use App\Services\BaseService;
use Exception;
use DB;
use Auth;
use Illuminate\Support\Facades\Mail;

class UserOrderService extends BaseService
{
  public function user()
  {
      $user = Auth::user();

      return $user;
  }

  public function fetchAllPurchasedCourses()
  {
      try {
         $userProfile = $this->checkUser();
         $orders = false;
         if($userProfile == 1) {
         $orders = UserOrder::with('learnerProfile', 'courses')
         ->where(['learner_profile_id', $this->$user->learnerProfile->id], ['course_id', '!=', null])
         ->orderby('created_at', 'asc')->get();
       }
       elseif($userProfile == 2) {
         $orders = UserOrder::with('businessProfile', 'courses')
         ->where(['business_profile_id', $this->$user->businessProfile->id], ['course_id', '!=', null])
         ->orderby('created_at', 'asc')->get();
       }
       else {
         return formatResponse(200, 'User record not found', true);
       }
         if (! $orders) {
             return formatResponse(200, 'No Payment record found', true);
         } else {
             return formatResponse(200, 'Payments retrieved successfully', true, $orders);
         }
     } catch (Exception $e) {
         return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
     }
  }

  public function fetchOneCourseOrder($id)
  {
      try {
          $order = UserOrder::with('learnerProfile', 'businessProfile', 'courses')->where('id', $id)->first();
          if (! $order) {
              return formatResponse(404, 'Payment doesn\'t exist!', false);
          } else {
              return formatResponse(200, 'Payment retrieved successfully', true, $order);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function fetchCourseOrderByReference($payment_reference)
  {
      try {
          $order = UserOrder::with('learnerProfile', 'businessProfile', 'courses')->where('payment_reference', $payment_reference)->first();
          if (! $order) {
              return formatResponse(404, 'Payment doesn\'t exist!', false);
          } else {
              return formatResponse(200, 'Payment retrieved successfully', true, $order);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function fetchAllPurchasedBundles()
  {
     try {
        $orders = UserOrder::with('learnerProfile', 'businessProfile', 'bundles')->where('bundle_id', '!=', null)->orderby('created_at', 'asc')->get();
        if (! $orders) {
            return formatResponse(200, 'No Payment record found', true);
        } else {
            return formatResponse(200, 'Payments retrieved successfully', true, $orders);
        }
    } catch (Exception $e) {
        return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
    }
  }

  public function fetchOneBundleOrder($id)
  {
      try {
          $order = UserOrder::with('learnerProfile', 'businessProfile', 'bundles')->where('id', $id)->first();
          if (! $order) {
              return formatResponse(404, 'Payment doesn\'t exist!', false);
          } else {
              return formatResponse(200, 'Payment retrieved successfully', true, $order);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
  }

  public function fetchBundleOrderByReference($payment_reference)
  {
      try {
          $order = UserOrder::with('learnerProfile', 'businessProfile', 'bundles')->where('payment_reference', $payment_reference)->first();
          if (! $order) {
              return formatResponse(404, 'Payment doesn\'t exist!', false);
          } else {
              return formatResponse(200, 'Payment retrieved successfully', true, $order);
          }
      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
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

}
