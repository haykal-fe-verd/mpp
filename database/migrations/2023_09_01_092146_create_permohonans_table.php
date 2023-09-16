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
        Schema::create('tb_permohonan', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['menunggu', 'ditolak', 'selesai'])->default('menunggu');
            $table->string('no_resi')->nullable();
            $table->string('pesan')->nullable();
            $table->enum('status_pengambilan', ['0', '1'])->default('0');
            $table->string('file');

            $table->unsignedBigInteger('masyarakat_id');
            $table->foreign('masyarakat_id')->references('id')->on('tb_masyarakat')->onDelete('cascade');
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
        Schema::dropIfExists('tb_permohonan');
    }
};
