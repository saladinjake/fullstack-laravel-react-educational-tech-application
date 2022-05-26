<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CategorySeeder::class,
            LanguageSeeder::class,
            CountriesTableSeeder::class,
            PermissionsTableSeeder::class,
            RolesTableSeeder::class,
            ConnectRelationshipsSeeder::class,
            UsersTableSeeder::class,
            IndustriesTableSeeder::class,
            BusinessSeeder::class,
            CertificateSeeder::class,
        ]);
    }
}
