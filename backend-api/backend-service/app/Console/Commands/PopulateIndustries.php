<?php

namespace App\Console\Commands;

use App\Models\Industry;
use Illuminate\Console\Command;

class PopulateIndustries extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'populate:industries';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seeds industries';

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
        $this->info('Populating Questence Industries...🚀');

        $industries = [
            ['id' => '1', 'name' => 'Accounting'],
            ['id' => '2', 'name' => 'Advertising'],
            ['id' => '3', 'name' => 'Airlines/Aviation'],
            ['id' => '4', 'name' => 'Animation'],
            ['id' => '5', 'name' => 'Apparel & Fashion'],
            ['id' => '6', 'name' => 'Architecture & Planning'],
            ['id' => '7', 'name' => 'Arts and Crafts'],
            ['id' => '8', 'name' => 'Automotive'],
            ['id' => '9', 'name' => 'Aviation & Aerospace'],
            ['id' => '10', 'name' => 'Banking'],
            ['id' => '11', 'name' => 'Biotechnology'],
            ['id' => '12', 'name' => 'Broadcast Media'],
            ['id' => '13', 'name' => 'Building Materials'],
            ['id' => '14', 'name' => 'Business'],
            ['id' => '15', 'name' => 'Capital Markets'],
            ['id' => '16', 'name' => 'Chemicals'],
            ['id' => '17', 'name' => 'Civic & Social Organization'],
            ['id' => '18', 'name' => 'Civil Engineering'],
            ['id' => '19', 'name' => 'Commercial Real Estate'],
            ['id' => '20', 'name' => 'Computer & Network Security'],
            ['id' => '21', 'name' => 'Computer Games'],
            ['id' => '22', 'name' => 'Computer Hardware'],
            ['id' => '23', 'name' => 'Computer Networking'],
            ['id' => '24', 'name' => 'Computer Software'],
            ['id' => '25', 'name' => 'Construction'],
            ['id' => '26', 'name' => 'Consumer Electronics'],
            ['id' => '27', 'name' => 'Consumer Goods'],
            ['id' => '28', 'name' => 'Consumer Services'],
            ['id' => '29', 'name' => 'Cosmetics'],
            ['id' => '30', 'name' => 'Dairy'],
            ['id' => '31', 'name' => 'Defense & Space'],
            ['id' => '32', 'name' => 'Design'],
            ['id' => '33', 'name' => 'Education Management'],
            ['id' => '34', 'name' => 'E-Learning'],
            ['id' => '35', 'name' => 'Electrical/Electronic Manufacturing'],
            ['id' => '36', 'name' => 'Entertainment'],
            ['id' => '37', 'name' => 'Environmental Services'],
            ['id' => '38', 'name' => 'Events Services'],
            ['id' => '39', 'name' => 'Facilities Services'],
            ['id' => '40', 'name' => 'Farming'],
            ['id' => '41', 'name' => 'Financial Services'],
            ['id' => '42', 'name' => 'Fine Art'],
            ['id' => '43', 'name' => 'Fishery'],
            ['id' => '44', 'name' => 'Food & Beverages'],
            ['id' => '45', 'name' => 'Food Production'],
            ['id' => '46', 'name' => 'Furniture'],
            ['id' => '47', 'name' => 'Gambling & Casinos'],
            ['id' => '48', 'name' => 'Glass, Ceramics & Concrete'],
            ['id' => '49', 'name' => 'Government'],
            ['id' => '50', 'name' => 'Graphic Design'],
            ['id' => '51', 'name' => 'Health, Wellness and Fitness'],
            ['id' => '52', 'name' => 'Hospital & Health Care'],
            ['id' => '53', 'name' => 'Hospitality'],
            ['id' => '54', 'name' => 'Human Resources'],
            ['id' => '55', 'name' => 'Import and Export'],
            ['id' => '56', 'name' => 'Information Services'],
            ['id' => '57', 'name' => 'Information Technology and Services'],
            ['id' => '58', 'name' => 'Insurance'],
            ['id' => '59', 'name' => 'Investment Banking'],
            ['id' => '60', 'name' => 'Investment Management'],
            ['id' => '61', 'name' => 'Judiciary'],
            ['id' => '62', 'name' => 'Law Enforcement'],
            ['id' => '63', 'name' => 'Legal Services'],
            ['id' => '64', 'name' => 'Leisure, Travel & Tourism'],
            ['id' => '65', 'name' => 'Libraries'],
            ['id' => '66', 'name' => 'Logistics and Supply Chain'],
            ['id' => '67', 'name' => 'Luxury Goods & Jewelry'],
            ['id' => '68', 'name' => 'Machinery'],
            ['id' => '69', 'name' => 'Management Consulting'],
            ['id' => '70', 'name' => 'Maritime'],
            ['id' => '71', 'name' => 'Market Research'],
            ['id' => '72', 'name' => 'Marketing and Advertising'],
            ['id' => '73', 'name' => 'Mechanical or Industrial Engineering'],
            ['id' => '74', 'name' => 'Media Production'],
            ['id' => '75', 'name' => 'Military'],
            ['id' => '76', 'name' => 'Mining'],
            ['id' => '77', 'name' => 'Museums and Institutions'],
            ['id' => '78', 'name' => 'Music'],
            ['id' => '79', 'name' => 'Nanotechnology'],
            ['id' => '80', 'name' => 'Non-Profit Organization'],
            ['id' => '81', 'name' => 'Oil & Energy'],
            ['id' => '82', 'name' => 'Outsourcing/Offshoring'],
            ['id' => '83', 'name' => 'Package/Freight Delivery'],
            ['id' => '84', 'name' => 'Packaging and Containers'],
            ['id' => '85', 'name' => 'Pharmaceuticals'],
            ['id' => '86', 'name' => 'Photography'],
            ['id' => '87', 'name' => 'Political Organization'],
            ['id' => '88', 'name' => 'Primary/Secondary Education'],
            ['id' => '89', 'name' => 'Printing'],
            ['id' => '90', 'name' => 'Professional Training & Coaching'],
            ['id' => '91', 'name' => 'Public Relations and Communications'],
            ['id' => '92', 'name' => 'Publishing'],
            ['id' => '93', 'name' => 'Real Estate'],
            ['id' => '94', 'name' => 'Recreational Facilities and Services'],
            ['id' => '95', 'name' => 'Renewables & Environment'],
            ['id' => '96', 'name' => 'Research'],
            ['id' => '97', 'name' => 'Restaurants'],
            ['id' => '98', 'name' => 'Retail'],
            ['id' => '99', 'name' => 'Security and Investigations'],
            ['id' => '100', 'name' => 'Sports'],
            ['id' => '101', 'name' => 'Telecommunications'],
            ['id' => '102', 'name' => 'Transportation'],
            ['id' => '103', 'name' => 'Utilities'],
            ['id' => '104', 'name' => 'Venture Capital & Private Equity'],
            ['id' => '105', 'name' => 'Veterinary'],
            ['id' => '106', 'name' => 'Warehousing'],
            ['id' => '107', 'name' => 'Wholesale'],
            ['id' => '108', 'name' => 'Wine and Spirits'],
            ['id' => '109', 'name' => 'Wireless'],
            ['id' => '110', 'name' => 'Others']
        ];

        foreach ($industries as $industry) {
            Industry::firstOrCreate([
                'id' => $industry['id'],
                'name' => $industry['name']
            ]);
        }
        unset($industries);

        $this->info('Industries populated 🔥');

        return 0;
    }
}
