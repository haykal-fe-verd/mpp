<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_persyaratan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_persyaratan');

            $table->unsignedBigInteger('layanan_id');
            $table->foreign('layanan_id')->references('id')->on('tb_layanan')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_persyaratan');
    }
};
