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
        Schema::create('tb_pengaduan', function (Blueprint $table) {
            $table->id();
            $table->enum('jenis', ['aduan', 'saran']);
            $table->string('nama');
            $table->string('email');
            $table->string('no_hp');
            $table->text('alamat');
            $table->text('pengaduan');
            $table->enum('status', ['menunggu', 'diterima'])->default('menunggu');


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
        Schema::dropIfExists('tb_pengaduan');
    }
};
