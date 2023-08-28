<?php

namespace Database\Seeders;

use App\Models\Instansi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstansiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {
            Instansi::create([
                'nama_instansi' => 'Instansi ' . $i,
                'profil_instansi' => 'Profil Instansi yang ke ' . $i,
                'telepon' => fake()->phoneNumber(),
                'email' => fake()->email(),
                'faks' => fake()->phoneNumber(),
                'website' => "www.instansi-" . $i . ".com",
                'alamat' => fake()->address(),
                "logo" => "logo/QzKaBnDNDO4LHKdQbj5mQmsJCudH85WuuWcI9IXk.png",
            ]);
        }
    }
}
