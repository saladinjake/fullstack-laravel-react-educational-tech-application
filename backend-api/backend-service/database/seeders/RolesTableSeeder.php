<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Role Types
         *
         */
        $RoleItems = [
            [
                'name'        => 'SuperAdmin',
                'slug'        => 'superadmin',
                'description' => 'Super Admin Role',
                'level'       => 10,
            ],
            [
                'name'        => 'Admin',
                'slug'        => 'admin',
                'description' => 'Admin Role',
                'level'       => 8,
            ],
            [
                'name'        => 'Business',
                'slug'        => 'business',
                'description' => 'Business Role',
                'level'       => 7,
            ],
            [
                'name'        => 'Partner',
                'slug'        => 'partner',
                'description' => 'Partner Role',
                'level'       => 6,
            ],
            [
                'name'        => 'Instructor',
                'slug'        => 'instructor',
                'description' => 'Instructor Role',
                'level'       => 5,
            ],
            [
                'name'        => 'TeamLead',
                'slug'        => 'teamlead',
                'description' => 'Course Team Leader Role',
                'level'       => 3,
            ],
            [
                'name'        => 'ContentManager',
                'slug'        => 'contentmanager',
                'description' => 'Course Team Content Manager Role',
                'level'       => 3,
            ],
            [
                'name'        => 'TeamMember',
                'slug'        => 'teammember',
                'description' => 'Course Team member',
                'level'       => 3,
            ],
            [
                'name'        => 'Hod',
                'slug'        => 'hod',
                'description' => 'Head of Department Role',
                'level'       => 4,
            ],
            [
                'name'        => 'User',
                'slug'        => 'user',
                'description' => 'User Role',
                'level'       => 1,
            ],
            [
                'name'        => 'Unassigned',
                'slug'        => 'unassigned',
                'description' => 'Unassigned Role',
                'level'       => 0,
            ],
        ];

        /*
         * Add Role Items
         *
         */
        foreach ($RoleItems as $RoleItem) {
            $newRoleItem = config('roles.models.role')::where('slug', '=', $RoleItem['slug'])->first();
            if ($newRoleItem === null) {
                $newRoleItem = config('roles.models.role')::create([
                    'name'          => $RoleItem['name'],
                    'slug'          => $RoleItem['slug'],
                    'description'   => $RoleItem['description'],
                    'level'         => $RoleItem['level'],
                ]);
            }
        }
    }
}
