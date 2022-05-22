<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('learner_profile_id')->nullable()->unsigned()->index();
            $table->foreign('learner_profile_id')->references('id')->on('learner_profiles')->onDelete('cascade');
            $table->bigInteger('business_profile_id')->nullable()->unsigned()->index();
            $table->foreign('business_profile_id')->references('id')->on('learner_profiles')->onDelete('cascade');
            $table->bigInteger('course_id')->nullable()->unique()->unsigned()->index();
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->bigInteger('bundle_id')->nullable()->unique()->unsigned()->index();
            $table->foreign('bundle_id')->references('id')->on('bundles')->onDelete('cascade');
            $table->string('payment_reference')->nullable();
            $table->enum('status',['-1','0','1','2','3','4','5','6','7','8','9','10'])->default('-1');
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
        Schema::dropIfExists('user_orders');
    }
}
