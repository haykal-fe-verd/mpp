<?php

namespace App\Http\Middleware;

use App\Models\Berita;
use App\Models\Instansi;
use App\Models\Mpp;
use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => [
                    'name' => $request->user()?->name,
                    'email' => $request->user()?->email,
                    'role' => $request->user()?->role,
                    'image' => $request->user()?->image,
                ],
            ],
            'sessions' => [
                'message' => session('message'),
                'success' => session('success'),
                'error' => session('error'),
            ],
            'mpp' => Mpp::first(),
            'pengumuman' => Pengumuman::first(),
            'instansi' => Instansi::with('layanan.persyaratan')->get(),
            'notifications' => Auth::user() ? [
                'count' => Auth::user()->unreadNotifications()->count(),
                'list' => Auth::user()->unreadNotifications()->limit(5)->get(),
            ] : null,
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
