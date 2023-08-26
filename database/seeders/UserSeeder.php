<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Masyarakat;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //admin
        $admin = User::create([
            'name' => fake()->name(),
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'admin',
            'image' => '1691120499.jpg',
        ]);

        Admin::create([
            'user_id' => $admin->id,
            'nik' => fake()->numerify('################'),
            'tanggal_lahir' => now(),
            'tempat_lahir' => fake()->city(),
            'jenis_kelamin' => fake()->randomElement(['P', 'L']),
            'no_hp' => fake()->phoneNumber(),
            'alamat' => fake()->address(),
            'umur' => 40,
        ]);

        //masyarakat
        $masyarakat = User::create([
            'name' => fake()->name(),
            'email' => 'masyarakat@masyarakat.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role' => 'masyarakat',
            'image' => '1691120499.jpg',
        ]);

        Masyarakat::create([
            'user_id' => $masyarakat->id,
            'nik' => fake()->numerify('################'),
            'tanggal_lahir' => now(),
            'tempat_lahir' => fake()->city(),
            'jenis_kelamin' => fake()->randomElement(['P', 'L']),
            'no_hp' => fake()->phoneNumber(),
            'alamat' => fake()->address(),
            'umur' => 20,
        ]);
    }
}
