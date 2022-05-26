<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ConnectRelationshipsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Get Available Permissions.
         */
        $permissions = config('roles.models.permission')::all();

        /**
         * Attach Permissions to Roles.
         */
        $roleSuperAdmin = config('roles.models.role')::where('name', '=', 'SuperAdmin')->first();
        foreach ($permissions as $permission) {
            $roleSuperAdmin->attachPermission($permission);
        }

        //HOD Attachments
        $hodPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Department')->first();
        $roleHod = config('roles.models.role')::where('name', '=', 'Hod')->first();
        $roleHod->attachPermission($hodPerm);

        //Admin Attachments
        $adminPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Users')->first();
        $roleAdmin = config('roles.models.role')::where('name', '=', 'Admin')->first();
        $roleAdmin->attachPermission($adminPerm);

        //Learner/User Attachments
        $userPerm = config('roles.models.permission')::where('name', '=', 'Can View Courses')->first();
        $roleUser = config('roles.models.role')::where('name', '=', 'User')->first();
        $roleUser->attachPermission($userPerm);

        //Instructor Attachments
        $coursePerm = config('roles.models.permission')::where('name', '=', 'Can Manage Courses')->first();
        $programPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Programs')->first();
        $roleInstructor = config('roles.models.role')::where('name', '=', 'Instructor')->first();
        $roleInstructor->attachPermission($coursePerm);
        $roleInstructor->attachPermission($programPerm);
    }
}
