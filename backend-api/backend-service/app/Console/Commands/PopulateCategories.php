<?php

namespace App\Console\Commands;

use App\Models\Category;
use Illuminate\Console\Command;

class PopulateCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'populate:categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seeds categories';

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
        $this->info('Populating Questence Categories...🚀');

        $categories = [
            ['id' => '1', 'name' => 'Development', 'parent_id' => NULL],
            ['id' => '2', 'name' => 'Business', 'parent_id' => NULL],
            ['id' => '3', 'name' => 'Finance', 'parent_id' => NULL],
            ['id' => '4', 'name' => 'Information Technology', 'parent_id' => NULL],
            ['id' => '5', 'name' => 'Office Productivity', 'parent_id' => NULL],
            ['id' => '6', 'name' => 'Design', 'parent_id' => NULL],
            ['id' => '7', 'name' => 'Marketing', 'parent_id' => NULL],
            ['id' => '8', 'name' => 'Lifestyle', 'parent_id' => NULL],
            ['id' => '9', 'name' => 'Health and Fitness', 'parent_id' => NULL],
            ['id' => '10', 'name' => 'Hospitality', 'parent_id' => NULL],
            ['id' => '11', 'name' => 'Music', 'parent_id' => NULL],
            ['id' => '12', 'name' => 'Others', 'parent_id' => NULL],
            ['id' => '13', 'name' => 'Web Development', 'parent_id' => 1],
            ['id' => '14', 'name' => 'Entrepreneurship', 'parent_id' => 2],
            ['id' => '15', 'name' => 'Accounting and Book keeping', 'parent_id' => 3],
            ['id' => '16', 'name' => 'Network Security', 'parent_id' => 4],
            ['id' => '17', 'name' => 'Microsoft', 'parent_id' => 5],
            ['id' => '18', 'name' => '3D and Animation', 'parent_id' => 6],
            ['id' => '19', 'name' => 'Advertising', 'parent_id' => 7],
            ['id' => '20', 'name' => 'Arts and Crafts', 'parent_id' => 8],
            ['id' => '21', 'name' => 'Nutrition', 'parent_id' => 9],
            ['id' => '22', 'name' => 'Hotel', 'parent_id' => 10],
            ['id' => '23', 'name' => 'Music Production', 'parent_id' => 11],
            ['id' => '24', 'name' => 'Interior Design', 'parent_id' => 12],
            ['id' => '25', 'name' => 'software Testing', 'parent_id' => 1],
        ];
        foreach ($categories as $cat) {
            Category::firstOrCreate([
                'id' => $cat['id'],
                'name' => $cat['name'],
                'parent_id' => $cat['parent_id']
            ]);
        }
        unset($categories);

        $this->info('Categories populated 🔥');
        return 0;
    }
}
