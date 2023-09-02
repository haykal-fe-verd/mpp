<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\Persyaratan;
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
            'nama_persyaratan' => 'required|array'
        ]);

        $layanan = new Layanan();
        $layanan->instansi_id = $request->instansi_id;
        $layanan->nama_layanan = $request->input('nama_layanan');
        $layanan->deskripsi_layanan = $request->input('deskripsi_layanan');
        $layanan->save();

        if ($request->has('nama_persyaratan')) {
            foreach ($request->input('nama_persyaratan') as $persyaratanItem) {
                $persyaratan = new Persyaratan();
                $persyaratan->layanan_id = $layanan->id;
                $persyaratan->nama_persyaratan = $persyaratanItem;
                $persyaratan->save();
            }
        }

        return redirect()->back()->with('success', 'Layanan berhasil ditambahkan');
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'instansi_id' => 'required',
            'nama_layanan' => 'required',
            'deskripsi_layanan' => 'required',
            'nama_persyaratan' => 'array'

        ]);

        $layanan = Layanan::findOrFail($id);

        $layanan->instansi_id = $request->instansi_id;
        $layanan->nama_layanan = $request->input('nama_layanan');
        $layanan->deskripsi_layanan = $request->input('deskripsi_layanan');
        $layanan->save();

        if ($request->has('nama_persyaratan')) {
            $layanan->persyaratan()->delete();
            foreach ($request->input('nama_persyaratan') as $persyaratanItem) {
                $persyaratan = new Persyaratan();
                $persyaratan->layanan_id = $layanan->id;
                $persyaratan->nama_persyaratan = $persyaratanItem;
                $persyaratan->save();
            }
        }

        return redirect()->back()->with('success', 'Layanan berhasil diedit');
    }

    public function destroy(string $id): RedirectResponse
    {
        $layanan = Layanan::findOrFail($id);
        $layanan->persyaratan()->delete();
        $layanan->delete();

        return redirect()->back()->with('success', 'Layanan berhasil dihapus');
    }
}
