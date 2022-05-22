<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BusinessProfile;
use App\Models\User;
use App\Models\Country;
use DB;

class BusinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = $this->getAdmin();
        $country = $this->getCountry();
        $data = [];

        DB::transaction(function () use ($user, $country, $data) {
            if (User::where(['id' => $user['0']])->exists()) {
                $data['user_id'] = $user['0'];
                $data['company_name'] = 'Questence Limited';
                $data['company_description'] = 'Questence Limited';
                $data['company_phone'] = '+2347000004278';
                $data['hq_address'] = '8a, Adekunle Lawal Street, Off Mobolaji Johnson Avenue, Ikoyi, Lagos
                Nigeria.';
                $data['registration_number'] = 'RC12345678';
                $data['company_logo'] = 'questence.jpg';
                $data['no_of_employees'] = '20-100';
                $data['color_theme'] = '#B84847';
                $data['country_id'] = $country['0'];
                $data['industry_id'] = 35;
                $data['linkedin_page'] = 'https://linkedin.com/company/questence-limited';
                $data['facebook_page'] = 'https://web.facebook.com/questence-limited';
                $data['website'] = 'https://questence.org';
                $data['status'] = '0';
                $saveBusiness = BusinessProfile::create($data);
            } else {
                $this->info('User record not found');
            }
        });

    }

    public function getAdmin()
    {
        return User::where('email', 'admin@questence.org')->pluck('id');
    }

    public function getCountry()
    {
        return Country::where('nicename', 'Nigeria')->pluck('id');
    }
}
