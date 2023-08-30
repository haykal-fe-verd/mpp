<?php

namespace Database\Seeders;

use App\Models\Persyaratan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersyaratanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 1000; $i++) {
            Persyaratan::create([
                'layanan_id' => fake()->numberBetween(1, 100),
                'nama_persyaratan' => 'Persyaratan ke ' . $i,
            ]);
        }
    }
}
