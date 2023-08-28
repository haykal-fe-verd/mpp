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
        Schema::create('tb_instansi', function (Blueprint $table) {
            $table->id();
            $table->string('nama_instansi');
            $table->string('profil_instansi');
            $table->string('telepon');
            $table->string('email');
            $table->string('faks');
            $table->string('website');
            $table->text('alamat');
            $table->string('logo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_instansi');
    }
};
