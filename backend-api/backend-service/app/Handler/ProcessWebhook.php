<?php
namespace App\Handler;
use \Spatie\WebhookClient\ProcessWebhookJob;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\UserOrder;
use App\Models\User;
use App\Models\Course;
use App\Models\Bundle;
//use App\Models\CoursePayment;
//use App\Models\BundlePayment;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CoursePurchaseNotification;

//The class extends "ProcessWebhookJob" class as that is the class //that will handle the job of processing our webhook before we have //access to it.
class ProcessWebhook extends ProcessWebhookJob
{
   /*
  public function handle(){
       $data = json_decode($this->webhookCall, true);
       //Do something with the event
       $status   = data_get($data['payload'], 'data.status');
       $order_id = data_get($data['payload'], 'data.metadata.custom_fields.0.value');
       $user_id  = data_get($data['payload'], 'data.metadata.custom_fields.1.value');

       try {
        if($status == "success") {
          $entry_type = $this->checkType($order_id);
          $entries    = $this->getEntry($order_id);
          $this->sendNotification($user_id, count($entries));

            foreach ($entries as $entry) {
              if($entry_type == 1) {
                $payment = UserOrder::create([
                    'learner_profile_id'  => $entry->learner_profile_id,
                    'business_profile_id' => $entry->business_profile_id,
                    'course_id'           => $entry->course_id,
                    'status'              => '1'
                ]);
          }
          elseif($entry_type == 2) {
            foreach ($entries as $entry) {
                $payment = UserOrder::create([
                    'learner_profile_id'  => $entry->learner_profile_id,
                    'business_profile_id' => $entry->business_profile_id,
                    'bundle_id'           => $entry->bundle_id,
                    'status'              => '1'
                ]);
            }
          }
          else {
            return formatResponse(200, 'Course or Bundle payment not found', true);
          }
         }
        }

      } catch (Exception $e) {
         return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
     }
    }
    */

    public function handle(){
         $data = json_decode($this->webhookCall, true);
         //Do something with the event
         $status   = data_get($data['payload'], 'data.status');
         $user_id  = data_get($data['payload'], 'data.metadata.custom_fields.1.value');
         $order_id = data_get($data['payload'], 'data.metadata.custom_fields.0.value');
         $courses = data_get($data['payload'], 'data.metadata.custom_fields.2.value');
         $course_ids = explode(',', $courses);
         try {
          if($status == "success") {
            $this->sendNotification($user_id, count($course_ids));
            $learner  = $this->getLearnerUser($user_id);
            //$business = $this->getBusinessUser($user_id);

              foreach ($course_ids as $course_id) {

                $courseType  = $this->getCourseType($course_id);
                if($courseType == 1) {
                  $payment = UserOrder::create([
                      'learner_profile_id'  => $learner,
                      //'business_profile_id' => $business,
                      'course_id'           => $course_id,
                      'payment_reference'   => $order_id,
                      'status'              => '1'
                  ]);
               }
                elseif($courseType == 2) {
                 $payment = UserOrder::create([
                      'learner_profile_id'  => $learner,
                      //'business_profile_id' => $business,
                      //'bundle_id'           => $course_id,
                      'payment_reference'   => $order_id,
                      'status'              => '1'
                  ]);
            }
            else {
              return formatResponse(200, 'Course or Bundle payment not completed', true);
            }
           }
          }

        } catch (Exception $e) {
           return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
       }
      }

    public function getCourseType($id) {
      $item = Course::where('id', $id)->first();
      if(is_null($item)) {
      $item = Bundle::where('id', $id)->first();
      return 2;
      }
      return 1;
    }

    public function getLearnerUser($id) {
     $item = User::findOrFail($id);
     $learner = $item->learnerProfile->id;
     if(!is_null($learner)) {
       return $learner;
     }
     return NULL;
   }

   public function getBusinessUser($id) {
     $item = User::findOrFail($id);
     $business = $item->businessProfile->id;
     if(!is_null($business)) {
       return $business;
     }
     return NULL;
   }

    public function sendNotification($user, $count)
    {
      $user = User::find($user);
        $notif = [
                'greeting' => 'Great',
                'body' => "You just made $count successful purchases",
                'thanks' => 'Time to get busy.',
                'actionText' => 'View Courses',
                'actionURL' => url('/enrollments/me'),
                'user_id' => $user->id
            ];
        return Notification::send($user, new CoursePurchaseNotification($notif));
    }

/*
  public function checkType($order_id)
  {
      $course = CoursePayment::where(['payment_reference' => $order_id])->first();
      DB::table('course_payments')->where('payment_reference', $order_id)->update(['status' => '1']);

    if(is_null($course)) {
      $bundle = BundlePayment::where(['payment_reference' => $order_id])->first();
      DB::table('bundle_payments')->where('payment_reference', $order_id)->update(['status' => '1']);
      return 2;
    }
    return 1;
  }

  public function getEntry($order_id)
  {
      $course = CoursePayment::where(['payment_reference' => $order_id])->get();
    if(is_null($course)) {
      $bundle = BundlePayment::where(['payment_reference' => $order_id])->get();
      return $bundle;
    }
    return $course;
  }
  */


}
