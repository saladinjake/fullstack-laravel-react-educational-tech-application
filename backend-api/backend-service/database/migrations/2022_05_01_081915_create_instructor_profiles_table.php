<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInstructorProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('instructor_profiles', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->index()->unique();
            $table->bigInteger('category_id')->unsigned()->index()->nullable();
            $table->string('gender')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->text('brief_introduction')->nullable();
            $table->text('detailed_introduction')->nullable();
            $table->string('employment_status')->nullable();
            $table->string('marital_status')->nullable();
            $table->bigInteger('industry_id')->unsigned()->nullable()->index();
            $table->string('experience_level')->nullable();
            $table->string('education_level')->nullable();
            $table->string('degree_obtained')->nullable();
            $table->string('language')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('current_employer_name')->nullable();
            $table->string('current_employer_designation')->nullable();
            $table->string('previous_employer_name')->nullable();
            $table->string('previous_employer_designation')->nullable();
            $table->text('previous_institutions')->nullable();
            $table->string('niche_courses')->nullable();
            $table->string('other_info')->nullable();
            $table->bigInteger('country_id')->unsigned()->index()->nullable();
            $table->enum('status',['-1','0','1','2','3','4','5','6','7','8','9','10'])->default('0');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });

        Schema::table('instructor_profiles', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('industry_id')->references('id')->on('industries')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('instructor_profiles');
    }
}
