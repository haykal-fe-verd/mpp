<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Instansi;
use App\Models\Layanan;
use App\Models\Pengaduan;
use App\Models\Permohonan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $currentYear = Carbon::now()->year;

        $totalInstansi = Instansi::count();
        $totalLayanan = Layanan::count();
        $totalBerita = Berita::count();
        $totalPengaduan = Pengaduan::count();

        $bulan = [
            '1' => 'Jan',
            '2' => 'Feb',
            '3' => 'Mar',
            '4' => 'Apr',
            '5' => 'Mei',
            '6' => 'Jun',
            '7' => 'Jul',
            '8' => 'Ags',
            '9' => 'Sep',
            '10' => 'Okt',
            '11' => 'Nov',
            '12' => 'Des'
        ];

        // admin
        $dataPermohonan = Permohonan::selectRaw('MONTH(created_at) AS bulan, COUNT(*) AS total_permohonan')
            ->whereYear('created_at', $currentYear)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total_permohonan', 'bulan')
            ->toArray();

        $chartAdmin = [];
        foreach ($bulan as $key => $value) {
            $chartAdmin[] = $dataPermohonan[$key] ?? 0;
        }

        // masyarakat
        $totalPermohonanSaya = Permohonan::where('masyarakat_id', $request->user()->userData()->id)->count();

        $dataPermohonanMasyarakat = Permohonan::selectRaw('MONTH(created_at) AS bulan, COUNT(*) AS total_permohonan')
            ->whereYear('created_at', $currentYear)
            ->where('masyarakat_id', $request->user()->userData()->id)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total_permohonan', 'bulan')
            ->toArray();

        $chartMasyarakat = [];
        foreach ($bulan as $key => $value) {
            $chartMasyarakat[] = $dataPermohonanMasyarakat[$key] ?? 0;
        }

        return Inertia::render('auth/dashboard/index', compact('totalInstansi', 'totalLayanan', 'totalBerita', 'totalPengaduan', 'bulan', 'chartAdmin', 'totalPermohonanSaya', 'chartMasyarakat'));
    }
}
