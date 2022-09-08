<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calenders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('event_id')->nullable();
            $table->string('summary')->nullable();
            $table->string('location')->nullable();
            $table->string('description')->nullable();
            $table->string('start_datetime');
            $table->string('end_datetime');
            $table->string('timezone');
            $table->integer('remind_before_in_mins')->default(10);
            $table->tinyInteger('all_day')->default(0);
            $table->timestamps();
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
        Schema::dropIfExists('calenders');
    }
};
