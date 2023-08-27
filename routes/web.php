<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MppController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// home
Route::get('/', [HomeController::class, 'home'])->name('home');

// tentang mpp
Route::get('/tentang-mpp', [HomeController::class, 'about'])->name('about');

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


Route::get('/dashboard', function () {
    return Inertia::render('auth/dashboard/index');
})->middleware(['auth', 'verified'])->name('dashboard');

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

    // admin
    Route::middleware('can:admin')->group(function () {
        // setting mpp
        Route::get('/setting-mpp', [MppController::class, 'index'])->name('mpp.index');
        Route::post('/setting-mpp', [MppController::class, 'store'])->name('mpp.store');
    });

    // masyarakat
    Route::middleware('can:masyarakat')->group(function () {
        // test
    });
});

require __DIR__ . '/auth.php';
