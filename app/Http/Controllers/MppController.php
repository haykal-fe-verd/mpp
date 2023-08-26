<?php

namespace App\Http\Controllers;

use App\Models\Mpp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class MppController extends Controller
{
    public function index(): Response
    {

        return Inertia::render('auth/admin/setting-mpp/index');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'deskripsi_mpp' => 'required',
            'kenapa_harus_mpp' => 'required',
            'logo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $mpp = Mpp::first();

        if ($request->hasFile('logo')) {
            $oldLogoPath = $mpp->logo;
            if ($oldLogoPath) {
                Storage::disk('public')->delete($oldLogoPath);
            }

            $logoPath = $request->file('logo')->store('logo', 'public');
            $mpp->logo = $logoPath;
        }

        $mpp->deskripsi_mpp = $request->input('deskripsi_mpp');
        $mpp->kenapa_harus_mpp = $request->input('kenapa_harus_mpp');
        $mpp->save();

        return redirect()->route('mpp.index')->with('success', 'Setting MPP Berhasil di update');
    }
}
