<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUsedSlotToBusinessCourseEnrolledTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('business_course_enrolled', function (Blueprint $table) {
            $table->integer('used_slot')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('business_course_enrolled', function (Blueprint $table) {
            $table->dropColumn(['used_slot']);
        });
    }
}
