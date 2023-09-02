<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\Permohonan;
use App\Models\Persyaratan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PermohonanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Permohonan::with(['masyarakat.user', 'layanan.persyaratan', 'layanan.instansi'])->latest();

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

    public function terima(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'pesan' => 'required',
        ]);

        $permohonan = Permohonan::findOrFail($id);
        if (!$permohonan->no_resi) {
            $lastResi = Permohonan::whereNotNull('no_resi')->orderBy('no_resi', 'desc')->first();
            $lastNumber = $lastResi ? intval(substr($lastResi->no_resi, 3)) : 0;
            $newNumber = $lastNumber + 1;
            $newResi = 'MPP-' . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
            $permohonan->no_resi = $newResi;
        }
        $permohonan->status = "selesai";
        $permohonan->pesan = $request->input('pesan');
        $permohonan->save();

        return redirect()->route('permohonan.index')->with('success', 'Permohonan berhasil diedit');
    }

    public function tolak(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'pesan' => 'required',
        ]);

        $permohonan = Permohonan::findOrFail($id);

        $permohonan->status = "ditolak";
        $permohonan->pesan = $request->input('pesan');
        $permohonan->save();

        return redirect()->route('permohonan.index')->with('success', 'Permohonan berhasil ditolak');
    }

    public function indexMasyarakat(Request $request): Response
    {
        $query = Permohonan::with(['masyarakat.user', 'layanan.persyaratan', 'layanan.instansi'])->where('masyarakat_id', $request->user()->userData()->id)->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->orWhereHas('layanan.instansi', function ($subquery) use ($search) {
                    $subquery->where('nama_instansi', 'like', '%' . $search . '%');
                })->orWhereHas('layanan', function ($subquery) use ($search) {
                    $subquery->where('nama_layanan', 'like', '%' . $search . '%');
                });
            });
        }

        $permohonan = $query->paginate($request->perpage ?? 10)->withQueryString();

        $layanan = Layanan::with(['instansi', 'persyaratan'])->get();
        return Inertia::render('auth/masyarakat/permohonan/index', compact('permohonan', 'layanan'));
    }

    public function storeMasyarakat(Request $request)
    {
        $request->validate([
            'layanan_id' => 'required',
            'file' => 'required|mimes:zip|max:2048',
        ]);

        $permohonan = new Permohonan();

        $path = $request->file('file')->store('uploads', 'public');
        $permohonan->file = $path;

        $permohonan->masyarakat_id = $request->user()->userData()->id;
        $permohonan->layanan_id = $request->input('layanan_id');
        $permohonan->save();

        return redirect()->route('permohonan.masyarakat.store')->with('success', 'Permohonan berhasil diajukan');
    }
}
