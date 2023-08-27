<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Admin;
use App\Models\Masyarakat;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $user->user_data = $user->userData();
        return Inertia::render('auth/profile/index', [
            'profile' => $user
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,' . $user->id,
        ]);

        // user
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            // delete foto jika sudah ada
            if ($user->image) {
                File::delete(public_path('avatars/' . basename($user->image)));
            }

            $file = $request->file('image');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('avatars'), $fileName);
            $user->image = $fileName;
        }

        $user->save();

        // admin
        if ($user->role === 'admin') {
            $admin = Admin::where('user_id', $user->id)->first();
            $request->validate([
                'nik' => 'required|string|unique:tb_admin,nik,' . $admin->nik . ',nik,user_id,' . $user->id,
                'tanggal_lahir' => 'required|date',
                'tempat_lahir' => 'required|string',
                'jenis_kelamin' => 'required|in:L,P',
                'no_hp' => 'required|string',
                'umur' => 'required|integer',
                'alamat' => 'required|string',
            ]);
            $admin->nik = $request->input('nik');
            $admin->tanggal_lahir = $request->input('tanggal_lahir');
            $admin->tempat_lahir = $request->input('tempat_lahir');
            $admin->jenis_kelamin = $request->input('jenis_kelamin');
            $admin->no_hp = $request->input('no_hp');
            $admin->umur = $request->input('umur');
            $admin->alamat = $request->input('alamat');
            $admin->save();
        }

        // masyarakat
        if ($user->role === 'masyarakat') {
            $masyarakat = Masyarakat::where('user_id', $user->id)->first();
            $request->validate([
                'nik' => 'required|string|unique:tb_masyarakat,nik,' . $masyarakat->nik . ',nik,user_id,' . $user->id,
                'tanggal_lahir' => 'required|date',
                'tempat_lahir' => 'required|string',
                'jenis_kelamin' => 'required|in:L,P',
                'no_hp' => 'required|string',
                'umur' => 'required|integer',
                'alamat' => 'required|string',
            ]);
            $masyarakat->nik = $request->input('nik');
            $masyarakat->tanggal_lahir = $request->input('tanggal_lahir');
            $masyarakat->tempat_lahir = $request->input('tempat_lahir');
            $masyarakat->jenis_kelamin = $request->input('jenis_kelamin');
            $masyarakat->no_hp = $request->input('no_hp');
            $masyarakat->umur = $request->input('umur');
            $masyarakat->alamat = $request->input('alamat');
            $masyarakat->save();
        }

        return redirect()->route('profile.edit')->with('success', 'Profil berhasil diupdate');
    }
}
