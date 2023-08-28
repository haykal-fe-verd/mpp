<?php

namespace App\Http\Controllers;

use App\Models\Instansi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class InstansiController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Instansi::latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_instansi', 'LIKE', "%$search%")
                    ->orWhere('alamat', 'LIKE', "%$search%")
                    ->orWhere('telepon', 'LIKE', "%$search%");
            });
        }

        $instansi = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('auth/admin/instansi/index', compact('instansi'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama_instansi' => 'required',
            'profil_instansi' => 'required',
            'telepon' => 'required',
            'email' => 'required',
            'faks' => 'required',
            'website' => 'required',
            'alamat' => 'required',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $instansi = new Instansi();

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logo', 'public');
            $instansi->logo = $path;
        }

        $instansi->nama_instansi = $request->input('nama_instansi');
        $instansi->profil_instansi = $request->input('profil_instansi');
        $instansi->telepon = $request->input('telepon');
        $instansi->email = $request->input('email');
        $instansi->faks = $request->input('faks');
        $instansi->website = $request->input('website');
        $instansi->alamat = $request->input('alamat');
        $instansi->save();

        return redirect()->route('instansi.index')->with('success', 'Instansi berhasil ditambahkan');
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'nama_instansi' => 'required',
            'profil_instansi' => 'required',
            'telepon' => 'required',
            'email' => 'required',
            'faks' => 'required',
            'website' => 'required',
            'alamat' => 'required',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $instansi = Instansi::findOrFail($id);

        if ($request->hasFile('logo')) {
            $request->validate(([
                'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]));

            $oldPath = $instansi->logo;
            if ($oldPath) {
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('logo')->store('logo', 'public');
            $instansi->logo = $path;
        }

        $instansi->nama_instansi = $request->input('nama_instansi');
        $instansi->profil_instansi = $request->input('profil_instansi');
        $instansi->telepon = $request->input('telepon');
        $instansi->email = $request->input('email');
        $instansi->faks = $request->input('faks');
        $instansi->website = $request->input('website');
        $instansi->alamat = $request->input('alamat');
        $instansi->save();

        return redirect()->route('instansi.index')->with('success', 'Instansi berhasil diedit');
    }

    public function destroy(string $id): RedirectResponse
    {
        $instansi = Instansi::findOrFail($id);

        $logoPath = $instansi->logo;
        if ($logoPath) {
            Storage::disk('public')->delete($logoPath);
        }

        $instansi->delete();

        return redirect()->route('instansi.index')->with('success', 'Instansi berhasil dihapus');
    }
}
