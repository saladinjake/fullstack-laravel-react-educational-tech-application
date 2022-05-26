<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBundlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bundles', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('instructor_id')->unsigned()->index();
            $table->foreign('instructor_id')->references('id')->on('instructor_profiles')->onDelete('cascade');
            $table->bigInteger('business_id')->unsigned()->index();
            $table->foreign('business_id')->references('id')->on('business_profiles')->onDelete('cascade');
            $table->string('name')->unique();
            $table->string('slug');
            $table->string('description');
            $table->string('discountIncrease')->nullable();
            $table->string('price')->nullable();
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
        Schema::dropIfExists('bundles');
    }
}
