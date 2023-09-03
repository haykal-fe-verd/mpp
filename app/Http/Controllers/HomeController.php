<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Instansi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('guest/home/index');
    }

    public function about(): Response
    {
        return Inertia::render('guest/about/index');
    }

    public function pengaduan(): Response
    {
        return Inertia::render('guest/pengaduan/index');
    }

    public function berita(Request $request): Response
    {
        $query = Berita::latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('judul', 'LIKE', "%$search%")
                    ->orWhere('isi', 'LIKE', "%$search%");
            });
        }

        $berita = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('guest/berita/index', compact('berita'));
    }

    public function detailBerita($slug): Response
    {
        $berita = Berita::where('slug', $slug)->first();

        return Inertia::render('guest/berita/detail', compact('berita'));
    }
}
