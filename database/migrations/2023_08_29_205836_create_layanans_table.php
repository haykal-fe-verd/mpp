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
        Schema::create('tb_layanan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_layanan');
            $table->text('deskripsi_layanan');

            $table->unsignedBigInteger('instansi_id');
            $table->foreign('instansi_id')->references('id')->on('tb_instansi')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_layanan');
    }
};
