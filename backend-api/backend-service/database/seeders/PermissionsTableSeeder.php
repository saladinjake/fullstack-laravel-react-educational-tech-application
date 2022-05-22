<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Permission Types
         *
         */
        $Permissionitems = [
            [
                'name'        => 'Can View Users',
                'slug'        => 'view.users',
                'description' => 'Can view users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Create Users',
                'slug'        => 'create.users',
                'description' => 'Can create new users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Edit Users',
                'slug'        => 'edit.users',
                'description' => 'Can edit users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Delete Users',
                'slug'        => 'delete.users',
                'description' => 'Can delete users',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Users',
                'slug'        => 'can.manage.users',
                'description' => 'Allows for the creation, enabling and disabling of users in the client company',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Department',
                'slug'        => 'can.manage.department',
                'description' => 'Allows for the creation, enabling and disabling of users in the department',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Partners',
                'slug'        => 'can.manage.partners',
                'description' => 'Allows for the creation, enabling and disabling of partners',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Businesses',
                'slug'        => 'can.manage.business',
                'description' => 'Allows for the creation, enabling and disabling of businesses',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Instructors',
                'slug'        => 'can.manage.instructor',
                'description' => 'Allows for the creation, enabling and disabling of instructors',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can View Courses',
                'slug'        => 'can.view.course',
                'description' => 'Allows access to a course',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Courses',
                'slug'        => 'can.manage.course',
                'description' => 'Allows for the creation, enabling and disabling of courses',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Can Manage Programs',
                'slug'        => 'can.manage.program',
                'description' => 'Allows for the creation, enabling and disabling of programs',
                'model'       => 'Permission',
            ],
        ];
        /*
         * Add Permission Items
         *
         */
        foreach ($Permissionitems as $Permissionitem) {
            $newPermissionitem = config('roles.models.permission')::where('slug', '=', $Permissionitem['slug'])->first();
            if ($newPermissionitem === null) {
                $newPermissionitem = config('roles.models.permission')::create([
                    'name'          => $Permissionitem['name'],
                    'slug'          => $Permissionitem['slug'],
                    'description'   => $Permissionitem['description'],
                    'model'         => $Permissionitem['model'],
                ]);
            }
        }
    }
}
