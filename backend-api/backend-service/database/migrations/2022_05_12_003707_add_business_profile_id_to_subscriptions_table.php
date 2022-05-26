<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBusinessProfileIdToSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->bigInteger('business_profile_id')->unsigned()->index()->after('course_id')->default(1);
        });

        Schema::table('subscriptions', function (Blueprint $table) {
            $table->foreign('business_profile_id')->references('id')->on('business_profiles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropForeign(['business_profile_id']);
            $table->dropColumn(['business_profile_id']);
        });
    }
}
