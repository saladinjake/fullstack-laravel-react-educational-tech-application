<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $certificates = [
          [
          'id' => '1',
          'name' => 'Certificate of Completion',
          'description' => 'You earn a certificate of completion after completing a course'
         ],
         [
          'id' => '2',
          'name' => 'Verified Certificate',
          'description' => 'You earn a verified certificate by passing the course with the required grade in the program'
        ],
        [
          'id' => '3',
          'name' => 'Program Certificate',
          'description' => 'You earn program certificates when you have earned a verified certificate for each course in the program. '
        ],
        [
          'id' => '4',
          'name' => 'Professional Certificate',
          'description' => 'You earn Institution issued professional certificate after completing a program.'
        ],
      ];

      foreach ($certificates as $certificate) {
          Certificate::firstOrCreate([
              'id' => $certificate['id'],
              'name' => $certificate['name'],
              'description' => $certificate['description']
          ]);
      }
      unset($certificates);
    }
}
