<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PengumumanController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('auth/admin/pengumuman/index');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'pengumuman' => 'required',
        ]);

        $pengumuman = Pengumuman::first();

        if ($pengumuman) {
            $pengumuman->pengumuman = $request->input('pengumuman');
            $pengumuman->save();
        } else {
            $pengumuman = new Pengumuman();
            $pengumuman->pengumuman = $request->input('pengumuman');
            $pengumuman->save();
        }

        return redirect()->route('pengumuman.index')->with('success', 'Pengumuman Berhasil di update');
    }
}
