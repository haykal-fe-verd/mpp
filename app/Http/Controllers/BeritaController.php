<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;



class BeritaController extends Controller
{
    public function index(Request $request): Response
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
        return Inertia::render('auth/admin/berita/index', compact('berita'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'judul' => 'required',
            'isi' => 'required',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $berita = new Berita();

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnail', 'public');
            $berita->thumbnail = $path;
        }

        $berita->judul = $request->input('judul');
        $berita->slug = Str::slug($request->judul, '-');
        $berita->isi = $request->input('isi');
        $berita->save();

        return redirect()->route('berita.index')->with('success', 'Berita berhasil ditambahkan');
    }

    public function update(Request $request, string $slug): RedirectResponse
    {
        $request->validate([
            'judul' => 'required',
            'isi' => 'required',
        ]);

        $berita = Berita::where('slug', $slug)->first();

        if ($request->hasFile('thumbnail')) {
            $request->validate(([
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]));

            $oldPath = $berita->thumbnail;
            if ($oldPath) {
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('thumbnail')->store('thumbnail', 'public');
            $berita->thumbnail = $path;
        }

        $berita->judul = $request->input('judul');
        $berita->slug = Str::slug($request->judul, '-');
        $berita->isi = $request->input('isi');
        $berita->save();

        return redirect()->route('berita.index')->with('success', 'Berita berhasil diedit');
    }

    public function destroy(string $slug): RedirectResponse
    {
        $berita = Berita::where('slug', $slug)->first();

        $thumbnailPath = $berita->thumbnail;
        if ($thumbnailPath) {
            Storage::disk('public')->delete($thumbnailPath);
        }

        $berita->delete();

        return redirect()->route('berita.index')->with('success', 'Berita berhasil dihapus');
    }
}
