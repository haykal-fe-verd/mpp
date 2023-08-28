<?php

namespace Database\Seeders;

use App\Models\Berita;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BeritaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 100; $i++) {
            Berita::create([
                "judul" => "Judul Berita " . $i,
                "slug" => "judul-berita-" . $i,
                "isi" => fake()->sentence(1000),
                "thumbnail" => "logo/QzKaBnDNDO4LHKdQbj5mQmsJCudH85WuuWcI9IXk.png"
            ]);
        }
    }
}
