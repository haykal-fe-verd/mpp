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
            "deskripsi_mpp" => "Mal Pelayanan Publik adalah tempat berlangsungnya kegiatan atau aktivitas penyelenggaraan pelayanan publik atas barang,jasa dan/atau pelayanan administrasi yang merupakan perluasan fungsi pelayanan terpadu baik pusat maupun daerah, serta pelayanan Badan Usaha Milik Negara/Badan Usaha Milik Daerah dan Swasta dalam rangka menyediakan pelayanan yang cepat, mudah, terjangkau, aman dan nyaman",
            "kenapa_harus_mpp" => "Efisien Pelayanan agar lebih cepat, Penghematan waktu dan biaya untuk masyarakat, Jarak yang terjangkau oleh masyarakat, Standarisasi Pelayanan Publik untuk semua",
            "logo" => "logo/QzKaBnDNDO4LHKdQbj5mQmsJCudH85WuuWcI9IXk.png",
        ]);
    }
}
