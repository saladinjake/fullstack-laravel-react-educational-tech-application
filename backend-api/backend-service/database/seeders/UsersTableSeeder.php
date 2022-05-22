<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdminRole = config('roles.models.role')::where('name', '=', 'SuperAdmin')->first();
        $adminRole = config('roles.models.role')::where('name', '=', 'Admin')->first();
        $instructorRole = config('roles.models.role')::where('name', '=', 'Instructor')->first();
        $hodRole = config('roles.models.role')::where('name', '=', 'Hod')->first();
        $userRole = config('roles.models.role')::where('name', '=', 'User')->first();
        $permissions = config('roles.models.permission')::all();
        $hodPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Department')->first();
        $adminPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Users')->first();
        $userPerm = config('roles.models.permission')::where('name', '=', 'Can View Courses')->first();
        $coursePerm = config('roles.models.permission')::where('name', '=', 'Can Manage Courses')->first();
        $programPerm = config('roles.models.permission')::where('name', '=', 'Can Manage Programs')->first();

        /*
         * Add Users
         *
         */
        if (config('roles.models.defaultUser')::where('email', '=', 'superadmin@questence.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'username' => 'Superuser',
                'first_name'     => 'Questence',
                'last_name'     => 'Superadmin',
                'email'    => 'superadmin@questence.org',
                'phone_number' => '07000004278',
                'password' => bcrypt('secret'),
                'category' => 'SUP',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($superAdminRole);
            foreach ($permissions as $permission) {
                $newUser->attachPermission($permission);
            }
        }

        if (config('roles.models.defaultUser')::where('email', '=', 'admin@questence.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'first_name'     => 'Questence',
                'last_name'     => 'Admin',
                'email'    => 'admin@questence.org',
                'phone_number' => '07000004278',
                'password' => bcrypt('password'),
                'category' => 'ADM',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($adminRole);
            $newUser->attachPermission($adminPerm);
        }

        if (config('roles.models.defaultUser')::where('email', '=', 'instructor@questence.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'first_name'     => 'Instructor',
                'last_name'     => 'Guy',
                'email'    => 'instructor@questence.org',
                'phone_number' => '07038797386',
                'password' => bcrypt('password'),
                'category' => 'INS',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($instructorRole);
            $newUser->attachPermission($coursePerm);
            $newUser->attachPermission($programPerm);
        }

        // if (config('roles.models.defaultUser')::where('email', '=', 'hod@questence.org')->first() === null) {
        //     $newUser = config('roles.models.defaultUser')::create([
        //         'first_name'     => 'HOD',
        //         'last_name'     => 'Guy',
        //         'email'    => 'hod@questence.org',
        //         'phone_number' => '07038797386',
        //         'password' => bcrypt('password'),
        //         'category' => 'LRN',
        //         'email_verified_at' => date('Y-m-d h:i:s'),
        //     ]);

        //     $newUser->attachRole($hodRole);
        //     $newUser->attachPermission($hodPerm);
        // }

        if (config('roles.models.defaultUser')::where('email', '=', 'user@questence.org')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'first_name'     => 'User',
                'last_name'     => 'Guy',
                'email'    => 'user@questence.org',
                'phone_number' => '07038797386',
                'password' => bcrypt('password'),
                'category' => 'LRN',
                'email_verified_at' => date('Y-m-d h:i:s'),
            ]);

            $newUser->attachRole($userRole);
            $newUser->attachPermission($userPerm);
        }
    }
}
