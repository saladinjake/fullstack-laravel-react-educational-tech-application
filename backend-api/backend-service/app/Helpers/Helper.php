<?php

    function interpreteUserCategory($status)
    {
        if ($status == 'SUP') {
            return 'SuperAdmin';
        } elseif ($status == 'ADM') {
            return 'Admin';
        } elseif ($status == 'LRN') {
            return 'Learner';
        } elseif ($status == 'INS') {
            return 'Instructor';
        } elseif ($status == 'BSN') {
            return 'Business';
        } elseif ($status == 'PTN') {
            return 'Partner';
        } elseif ($status == 'UNA') {
            return 'Unassigned';
        } else {
            return 'User';
        }
    }

    function getRoleUsers($roleId)
    {
        $queryRolesPivot = DB::table(config('roles.roleUserTable'));
        $users = [];
        if ($roleId) {
            $queryRolesPivot->where('role_id', '=', $roleId);
        }
        $pivots = $queryRolesPivot->get();
        if ($pivots->count() > 0) {
            foreach ($pivots as $pivot) {
                $users[] = $this->getUser($pivot->user_id);
            }
        }
        return $users;
    }

    function twoDecimalPlace($value)
    {
        $convert = number_format($value, 2);
        return $convert;
    }

?>
