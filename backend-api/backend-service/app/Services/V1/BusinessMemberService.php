<?php

namespace App\Services\V1;

use App\Models\Course;
use App\Models\User;
use App\Models\BusinessMember;
use App\Models\BusinessProfile;
use App\Services\BaseService;
use jeremykenedy\LaravelRoles\Models\Role;
use Exception;
use DB;
use Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\BusinessMemberWelcome;

class BusinessMemberService extends BaseService
{
    public function fetchAll()
    {
        try {
            $members = BusinessMember::where(['status' => '1'])->with('user', 'business')->latest()->paginate(15);
            if (! $members) {
                return formatResponse(200, 'No business member record found', true);
            } else {
                return formatResponse(200, 'Business member(s) retrieved successfully', true, $members);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getBusinessMembers()
    {
        try {
            $currentUser = $this->getLoggedInUser();
            $business = $this->getBusiness($currentUser['0']);

            if (! $currentUser){
                return formatResponse(404, 'User not found', false);
            } elseif (! $business){
                return formatResponse(404, 'Business record not found', false);
            } else {
                $member = BusinessMember::where(['business_id' => $business->id, 'status' => '1'])->first();

                if (! $member){
                    return formatResponse(200, 'No business member record found', true);
                } else {
                    $members = BusinessMember::where(['business_id' => $business->id, 'status' => '1'])->with('user')->latest()->paginate(15);

                    return formatResponse(200, 'Business member(s) retrieved successfully', true, $members);
                }
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function create($data)
    {
        try {

            $currentUser = $this->getLoggedInUser();
            $user = User::with('businessProfile')->find(Auth::id());

            if (! $currentUser){
                return formatResponse(404, 'Oh Snap! User doesn\'t exist!', false);
            } elseif (is_null($user->businessProfile->id)) {
                return formatResponse(404, 'Oh Snap! Business profile doesn\'t exist!', false);
            } elseif (! $user->hasRole(['business'])) {
                return formatResponse(403, 'Forbidden. You do not have access to this resource.', false);
            } else {

                $business = $user->businessProfile->id;
                $password = str_random(8);

                $data['password'] = $password;

                DB::transaction(function () use ($data, $business, &$newUser) {
                    $newUser = User::create($data);

                    $role = Role::where('name', '=', 'User')->first();
                    $newUser->attachRole($role);

                    if (empty($data['staff_no'])) {
                        $staff_no = NULL;
                    }

                    if (empty($data['job_designation'])) {
                        $designation = NULL;
                    }

                    $membership = BusinessMember::create([
                        'user_id' => $newUser->id,
                        'business_id' => $business,
                        'staff_no' => $staff_no,
                        'job_designation' => $designation
                    ]);
                });

                $company = $user;

                try {
                    Mail::to($newUser->email)->send(new BusinessMemberWelcome($newUser, $password, $company));
                } catch (\Exception $e) {
                    Log::error('Business member added successfully, but unable to send email to User. Please check your network connectivity.');
                }

                return formatResponse(201, 'Business member added successfully', true, $newUser);
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function createMultiple($data)
    {
        try {

            $currentUser = $this->getLoggedInUser();
            $user = User::with('businessProfile')->find(Auth::id());

            if (! $currentUser){
                return formatResponse(404, 'Oh Snap! User doesn\'t exist!', false);
            } elseif (is_null($user->businessProfile->id)) {
                return formatResponse(404, 'Oh Snap! Business profile doesn\'t exist!', false);
            } elseif (! $user->hasRole(['business'])) {
                return formatResponse(403, 'Forbidden. You do not have access to this resource.', false);
            } else {

                $business = $user->businessProfile->id;

                return formatResponse(200, 'Oh Snap! Upload feature in progress...', true);
            }

        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }

    }

    public function delete($id, $data = null)
    {
        try {
            $currentUser = $this->getLoggedInUser();
            $user = User::with('businessProfile')->find(Auth::id());
            $member = BusinessMember::where(['user_id' => $id, 'business_id' => $user->businessProfile->id])->first();

            if (! $currentUser){
                return formatResponse(404, 'Oh Snap! User doesn\'t exist!', false);
            } elseif (is_null($user->businessProfile->id)) {
                return formatResponse(404, 'Oh Snap! Business profile doesn\'t exist!', false);
            } elseif (! $user->hasRole(['business'])) {
                return formatResponse(403, 'Forbidden. You do not have access to this resource.', false);
            } else {

                DB::beginTransaction();
                    $member->update(['status' => '-1']);
                DB::commit();

                return formatResponse(200, 'Business member deleted successfully', true);
            }
        } catch (Exception $e) {
            DB::rollback();

            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        //..
    }

    public function update($data, $id)
    {
       //..
    }

    public function fetchMany($begin, $perPage, $sortBy, $sortDirection)
    {
        //..
    }

    public function getMember($id)
    {
        $member = BusinessMember::where(['id' => $id])->first();

        return $member;
    }

    public function getMemberProfile($id)
    {
        $member = BusinessMember::where(['id' => $id])->with('user')->first();

        return $member;
    }

    public function getBusiness($id)
    {
        $business = BusinessProfile::where(['user_id' => $id])->first();

        return $business;
    }

    public function getLoggedInUser()
    {
        $user = User::where(['id' => Auth::id()])->pluck('id');

        return $user;
    }

    public function getLoggedUser()
    {
        $user = User::where(['id' => Auth::id()])->first();

        return $user;
    }

    public function getCourse($id)
    {
        $course = Course::where(['id' => $id])->first();

        return $course;
    }

}
