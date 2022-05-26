<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business_profiles', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->index()->unique();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('industry_id')->unsigned()->index();
            $table->foreign('industry_id')->references('id')->on('industries')->onDelete('cascade');
            $table->bigInteger('country_id')->unsigned()->index();
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->string('company_name')->nullable()->unique();
            $table->text('company_description')->nullable();
            $table->string('company_phone')->nullable()->unique();
            $table->string('hq_address')->nullable();
            $table->string('registration_number')->nullable();
            $table->string('company_logo')->nullable();
            $table->string('no_of_employees')->nullable();
            $table->string('type_of_institution')->nullable();
            $table->string('linkedin_page')->nullable()->unique();
            $table->string('facebook_page')->nullable()->unique();
            $table->string('color_theme')->nullable();
            $table->string('website')->nullable()->unique();
            //$table->string('questence_url')->nullable();
            $table->enum('status',['-1','0','1','2','3','4','5','6','7','8'])->default('0');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('business_profiles');
    }
}
