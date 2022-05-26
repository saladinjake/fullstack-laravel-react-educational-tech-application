<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PopulateConnectRelationship extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'populate:connectRelationship';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Connect Roles and Permissions';

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
        $this->info('Connecting Roles and Permissions... 🚀');

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

        $this->info('Roles and Permissions Connected 🔥');

        return 0;
    }
}
