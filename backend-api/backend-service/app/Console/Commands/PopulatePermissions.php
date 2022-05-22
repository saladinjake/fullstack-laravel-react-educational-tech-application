<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PopulatePermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'populate:permissions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seeds permissions';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Populating Questence Permissions...🚀');

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

        $this->info('Permissions populated 🔥');

        return 0;
    }
}
