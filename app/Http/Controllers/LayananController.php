<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LayananController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'instansi_id' => 'required',
            'nama_layanan' => 'required',
            'deskripsi_layanan' => 'required',
        ]);

        $layanan = new Layanan();
        $layanan->instansi_id = $request->instansi_id;
        $layanan->nama_layanan = $request->input('nama_layanan');
        $layanan->deskripsi_layanan = $request->input('deskripsi_layanan');
        $layanan->save();

        return redirect()->back()->with('success', 'Layanan berhasil ditambahkan');
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'instansi_id' => 'required',
            'nama_layanan' => 'required',
            'deskripsi_layanan' => 'required',
        ]);

        $layanan = Layanan::findOrFail($id);

        $layanan->instansi_id = $request->instansi_id;
        $layanan->nama_layanan = $request->input('nama_layanan');
        $layanan->deskripsi_layanan = $request->input('deskripsi_layanan');
        $layanan->save();

        return redirect()->back()->with('success', 'Layanan berhasil diedit');
    }

    public function destroy(string $id): RedirectResponse
    {
        $layanan = Layanan::findOrFail($id);
        $layanan->delete();

        return redirect()->back()->with('success', 'Layanan berhasil dihapus');
    }
}
