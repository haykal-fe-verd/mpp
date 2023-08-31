<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstansiController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\MppController;
use App\Http\Controllers\PengaduanController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// home
Route::get('/', [HomeController::class, 'home'])->name('home');

// tentang mpp
Route::get('/tentang-mpp', [HomeController::class, 'about'])->name('about');

// pengaduan
Route::get('/pengaduan', [HomeController::class, 'pengaduan'])->name('pengaduan.index');
Route::post('/pengaduan', [PengaduanController::class, 'store'])->middleware('throttle:1,1')->name('pengaduan.store');

// guest
Route::middleware('guest')->group(function () {
    // login
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // register
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    // forgot password
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});


// auth
Route::middleware(['auth', 'verified'])->group(function () {
    // logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // change-password
    Route::get('password', [ChangePasswordController::class, 'index'])->name('password.index');
    Route::put('password', [ChangePasswordController::class, 'update'])->name('password.update');

    // verifikasi email
    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('verification.verify');
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('verification.send');

    // dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('auth/dashboard/index');
    })->name('dashboard');

    // admin
    Route::middleware('can:admin')->group(function () {
        // setting mpp
        Route::get('/admin/setting-mpp', [MppController::class, 'index'])->name('mpp.index');
        Route::post('/admin/setting-mpp', [MppController::class, 'store'])->name('mpp.store');

        // pengumuman
        Route::get('/admin/pengumuman', [PengumumanController::class, 'index'])->name('pengumuman.index');
        Route::post('/admin/pengumuman', [PengumumanController::class, 'store'])->name('pengumuman.store');

        // berita
        Route::get('/admin/berita', [BeritaController::class, 'index'])->name('berita.index');
        Route::post('/admin/berita', [BeritaController::class, 'store'])->name('berita.store');
        Route::post('/admin/berita/{slug}', [BeritaController::class, 'update'])->name('berita.update');
        Route::delete('/admin/berita/{slug}', [BeritaController::class, 'destroy'])->name('berita.destroy');

        // instansi
        Route::get('/admin/instansi', [InstansiController::class, 'index'])->name('instansi.index');
        Route::get('/admin/instansi/{id}', [InstansiController::class, 'show'])->name('instansi.show');
        Route::post('/admin/instansi', [InstansiController::class, 'store'])->name('instansi.store');
        Route::post('/admin/instansi/{id}', [InstansiController::class, 'update'])->name('instansi.update');
        Route::delete('/admin/instansi/{id}', [InstansiController::class, 'destroy'])->name('instansi.destroy');

        // layanan
        Route::post('/admin/layanan', [LayananController::class, 'store'])->name('layanan.store');
        Route::put('/admin/layanan/{id}', [LayananController::class, 'update'])->name('layanan.update');
        Route::delete('/admin/layanan/{id}', [LayananController::class, 'destroy'])->name('layanan.destroy');

        // pengaduan
        Route::get('/admin/pengaduan', [PengaduanController::class, 'index'])->name('pengaduan.admin.index');
        Route::patch('/admin/pengaduan/{id}', [PengaduanController::class, 'confirm'])->name('pengaduan.admin.confirm');
        Route::delete('/admin/pengaduan/{id}', [PengaduanController::class, 'destroy'])->name('pengaduan.admin.destroy');
    });

    // masyarakat
    Route::middleware('can:masyarakat')->group(function () {
        // test
    });
});

require __DIR__ . '/auth.php';
