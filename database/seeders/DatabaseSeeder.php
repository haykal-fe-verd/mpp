<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MppSeeder::class,
            PengumumanSeeder::class,
            BeritaSeeder::class,
            InstansiSeeder::class,
            LayananSeeder::class,
            PersyaratanSeeder::class,
            PengaduanSeeder::class,
            PermohonanSeeder::class
        ]);
    }
}
