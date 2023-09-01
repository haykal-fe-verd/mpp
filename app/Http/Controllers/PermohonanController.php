<?php

namespace App\Http\Controllers;

use App\Models\Permohonan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PermohonanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Permohonan::with(['masyarakat.user', 'layanan.persyaratan'])->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->orWhereHas('masyarakat.user', function ($subquery) use ($search) {
                    $subquery->where('name', 'like', '%' . $search . '%');
                })->orWhereHas('masyarakat', function ($subquery) use ($search) {
                    $subquery->where('alamat', 'like', '%' . $search . '%')
                        ->orWhere('no_hp', 'like', '%' . $search . '%');
                })->orWhereHas('layanan', function ($subquery) use ($search) {
                    $subquery->where('nama_layanan', 'like', '%' . $search . '%');
                });
            });
        }

        $permohonan = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('auth/admin/permohonan/index', compact('permohonan'));
    }
}
