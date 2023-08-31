<?php

namespace Database\Seeders;

use App\Models\Pengaduan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PengaduanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 100; $i++) {
            Pengaduan::create([
                'instansi_id' => fake()->numberBetween(1, 20),
                'jenis' => fake()->randomElement(['aduan', 'saran']),
                'nama' => fake()->name(),
                'email' => fake()->email(),
                'no_hp' => fake()->phoneNumber(),
                'alamat' => fake()->address(),
                'pengaduan' => fake()->sentence(200),
            ]);
        }
    }
}
