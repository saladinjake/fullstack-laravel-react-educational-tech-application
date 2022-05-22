<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business_members', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('member_id')->unsigned()->index()->unique();
            $table->foreign('member_id')->references('id')->on('instructor_profiles')->onDelete('cascade');
            $table->bigInteger('business_id')->unsigned()->index();
            $table->foreign('business_id')->references('id')->on('business_profiles')->onDelete('cascade');
            $table->string('staff_no')->nullable();
            $table->string('job_designation')->nullable();
            $table->enum('status',['-1','0','1','2','3','4','5','6','7','8'])->default('1');
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
        Schema::dropIfExists('business_members');
    }
}
