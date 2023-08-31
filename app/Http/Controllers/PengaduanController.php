<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PengaduanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Pengaduan::with('instansi')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama', 'LIKE', "%$search%")
                    ->orWhere('email', 'LIKE', "%$search%")
                    ->orWhere('no_hp', 'LIKE', "%$search%")
                    ->orWhere('alamat', 'LIKE', "%$search%")
                    ->orWhere('jenis', 'LIKE', "%$search%")
                    ->orWhere('pengaduan', 'LIKE', "%$search%")
                    ->orWhere('status', 'LIKE', "%$search%");
            });
        }

        $pengaduan = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('auth/admin/pengaduan/index', compact('pengaduan'));
    }


    public function store(Request $request): RedirectResponse
    {
        // dd($request->all());
        $request->validate([
            'instansi_id' => 'required',
            'nama' => 'required',
            'email' => 'required',
            'alamat' => 'required',
            'jenis' => 'required',
            'no_hp' => 'required',
            'pengaduan' => 'required',
        ]);

        Pengaduan::create($request->all());

        return redirect()->route('pengaduan.index')->with('success', 'Pengaduan berhasil dikirimkan');
    }

    public function confirm(string $id): RedirectResponse
    {
        $pengaduan = Pengaduan::findOrFail($id);

        $pengaduan->status = "diterima";
        $pengaduan->save();

        return redirect()->route('pengaduan.admin.index')->with('success', 'Pengaduan berhasil diedit');
    }


    public function destroy(string $id): RedirectResponse
    {
        $pengaduan = Pengaduan::findOrFail($id);
        $pengaduan->delete();

        return redirect()->route('pengaduan.admin.index')->with('success', 'Pengaduan berhasil dihapus');
    }
}
