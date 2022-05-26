<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['id' => '1', 'name' => 'Technology', 'parent_id' => NULL],
            ['id' => '2', 'name' => 'Business', 'parent_id' => NULL],
            ['id' => '3', 'name' => 'Finance', 'parent_id' => 2],
            ['id' => '4', 'name' => 'Office Productivity', 'parent_id' => NULL],
            ['id' => '5', 'name' => 'Health and Nutrition', 'parent_id' => NULL],
            ['id' => '6', 'name' => 'Others', 'parent_id' => NULL],
            ['id' => '7', 'name' => 'Web Development', 'parent_id' => 1],
            ['id' => '8', 'name' => 'Engineering', 'parent_id' => NULL],
            ['id' => '9', 'name' => 'Law', 'parent_id' => NULL],
            ['id' => '10', 'name' => 'Art & Humanities', 'parent_id' => NULL],
            ['id' => '11', 'name' => 'Languages', 'parent_id' => NULL],
            ['id' => '12', 'name' => 'Social Sciences', 'parent_id' => NULL],
            ['id' => '13', 'name' => 'Entrepreneurship', 'parent_id' => 2],
            ['id' => '14', 'name' => 'Accounting and Book keeping', 'parent_id' => 3],
            ['id' => '15', 'name' => 'Microsoft', 'parent_id' => 4],
            ['id' => '16', 'name' => 'Nutrition', 'parent_id' => 5],
            ['id' => '17', 'name' => 'Interior Design', 'parent_id' => 6],
            ['id' => '18', 'name' => 'Software Testing', 'parent_id' => 1],
            ['id' => '19', 'name' => 'Civil Engineering', 'parent_id' => 8],
            ['id' => '20', 'name' => 'Mechanical Engineering', 'parent_id' => 8],
            ['id' => '21', 'name' => 'Electrical Engineering', 'parent_id' => 8],
            ['id' => '22', 'name' => 'Strategy', 'parent_id' => 2],
            ['id' => '23', 'name' => 'Cloud Computing', 'parent_id' => 1],
            ['id' => '24', 'name' => 'Programming', 'parent_id' => 1],
            ['id' => '25', 'name' => 'Nursing', 'parent_id' => 5],
            ['id' => '26', 'name' => 'Diseases & Virology', 'parent_id' => 5],
            ['id' => '27', 'name' => 'Corporate Law', 'parent_id' => 9],
            ['id' => '28', 'name' => 'Property Law', 'parent_id' => 9],
            ['id' => '29', 'name' => 'Mitigation', 'parent_id' => 9],
            ['id' => '30', 'name' => 'History', 'parent_id' => 10],
            ['id' => '31', 'name' => 'Geography', 'parent_id' => 10],
            ['id' => '32', 'name' => 'Cultures', 'parent_id' => 10],
            ['id' => '33', 'name' => 'English', 'parent_id' => 11],
            ['id' => '34', 'name' => 'French', 'parent_id' => 11],
            ['id' => '35', 'name' => 'Yoruba', 'parent_id' => 11],
            ['id' => '36', 'name' => 'Economics', 'parent_id' => 12],
            ['id' => '37', 'name' => 'Psychology', 'parent_id' => 12],
            ['id' => '38', 'name' => 'Philosophy', 'parent_id' => 12],

        ];
        foreach ($categories as $cat) {
            Category::firstOrCreate([
                'id' => $cat['id'],
                'name' => $cat['name'],
                'parent_id' => $cat['parent_id']
            ]);
        }
        unset($categories);
    }
}
