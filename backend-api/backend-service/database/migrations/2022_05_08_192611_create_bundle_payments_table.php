<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBundlePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bundle_payments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('learner_id')->nullable()->unsigned()->index();
            $table->foreign('learner_id')->references('id')->on('learner_profiles')->onDelete('cascade');
            $table->bigInteger('business_id')->nullable()->unsigned()->index();
            $table->foreign('business_id')->references('id')->on('learner_profiles')->onDelete('cascade');
            $table->bigInteger('bundle_id')->unsigned()->index();
            $table->foreign('bundle_id')->references('id')->on('bundles')->onDelete('cascade');
            $table->string('price');
            $table->string('payment_reference');
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
        Schema::dropIfExists('bundle_payments');
    }
}
