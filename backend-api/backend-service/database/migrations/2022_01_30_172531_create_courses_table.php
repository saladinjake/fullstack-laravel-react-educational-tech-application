<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_code')->nullable();
            $table->string('course_name');
            $table->string('lms_course_id')->nullable()->unique();
            $table->string('slug');
            $table->float('price', 12,2)->default('0.00');
            $table->string('duration');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->timestamp('enrollment_start')->nullable();
            $table->timestamp('enrollment_end')->nullable();
            $table->string('learning_style')->nullable();
            $table->text('course_description')->nullable();
            $table->text('course_overview')->nullable();
            $table->string('course_thumbnail')->nullable();
            $table->string('introduction_video')->nullable();
            $table->string('course_cover_image')->nullable();
            $table->string('prerequisite_course')->nullable();
            $table->boolean('entrance_exam')->nullable();
            $table->string('license')->nullable();
            $table->string('overall_grade_range');
            $table->string('grace_period_on_deadline');
            $table->text('topics')->nullable();
            $table->text('outcomes')->nullable();
            $table->bigInteger('instructor_id')->unsigned()->index();
            $table->foreign('instructor_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('business_id')->unsigned()->index();
            $table->foreign('business_id')->references('id')->on('business_profiles')->onDelete('cascade');
            $table->bigInteger('category_id')->unsigned()->index();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->bigInteger('language_id')->unsigned()->index();
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
            $table->bigInteger('certificate_id')->unsigned()->index();
            $table->foreign('certificate_id')->references('id')->on('certificates')->onDelete('cascade');
            // $table->foreign('programme_id')->references('id')->on('programmes')->onDelete('cascade');
            $table->timestamps();
            $table->enum('status',['-1','0','1','2','3','4','5','6','7','8'])->default('0');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
