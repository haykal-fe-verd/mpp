<?php

namespace Database\Seeders;

use App\Models\Mpp;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mpp::create([
            "deskripsi_mpp" => "Ini adalah deskripsi mpp",
            "kenapa_harus_mpp" => "Ini adalah kenapa harus mpp",
            "logo" => "test",
        ]);
    }
}
