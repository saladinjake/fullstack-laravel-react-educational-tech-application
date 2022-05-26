<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PopulateRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'populate:roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seeds roles';

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
     * @return mixed
     */
    public function handle()
    {
        $this->info('Populating Questence Roles...🚀');

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

        $this->info('Roles populated 🔥');

        return 0;
    }
}
