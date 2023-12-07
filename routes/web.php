<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Common pages
Route::get('/', [MediaController::class, 'index'])->name('home');
Route::get('/home', [HomeController::class, 'index'])->name('test');

// Auth
Route::middleware('auth')->group(function () {
    Route::get('/leaderboard', [HomeController::class, 'leaderboard'])->name('leaderboard');
    Route::get('random', [MediaController::class, 'random'])->name('random');

    Route::name('user.')->group(function () {
        Route::get('user/{id}', [UserController::class, 'show'])->name('show');
    });

    Route::name('profile.')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
        Route::post('/profile', [ProfileController::class, 'update'])->name('update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::name('media.')->prefix('library')->group(function () {
        Route::get('create', [MediaController::class, 'create'])->name('create');
        Route::post('create', [MediaController::class, 'store']);
        Route::get('media/{id}', [MediaController::class, 'show'])->name('show');
        Route::put('media/{id}', [MediaController::class, 'update'])->name('update');
        Route::patch('media/{id}', [MediaController::class, 'approve'])->name('approve');
        Route::delete('media/{id}', [MediaController::class, 'destroy'])->name('destroy');
        Route::post('media/duplicate', [MediaController::class, 'duplicate'])->name('duplicate');
    });
});

// Administration
Route::middleware(['auth', 'verified'])->group(function () {
    // Admin dashboard
    Route::middleware('role:super-admin|admin')
        ->prefix('admin')
        ->name('admin.')
        ->group(function () {
            Route::get('dashboard', [DashboardController::class, 'index'])->name('index');
        });

    // Users
    Route::middleware('role:admin|super-admin')->prefix('admin')->name('admin.user.')
        ->group(function () {
            Route::get('utilisateurs', [DashboardController::class, 'users'])->name('index');
        });

    // Medias
    Route::middleware('role:admin|super-admin')->prefix('admin')->name('admin.media.')
        ->group(function () {
            Route::get('medias', [DashboardController::class, 'medias'])->name('index');
        });

    // Tags
    Route::middleware('role:admin|super-admin')->prefix('admin')->name('admin.tag.')
        ->group(function () {
            Route::get('tags', [DashboardController::class, 'tags'])->name('index');
            Route::get('tag/create', [TagController::class, 'create'])->name('create');
            Route::post('tag/create', [TagController::class, 'store']);
            Route::post('tag/edit/{id}', [TagController::class, 'update'])->name('update');
            Route::delete('tag/delete/{id}', [TagController::class, 'destroy'])->name('destroy');
        });

    // Badges
    Route::middleware('role:admin|super-admin')->prefix('admin')->name('admin.badge.')
        ->group(function () {
            Route::get('badges', [DashboardController::class, 'badges'])->name('index');
            Route::get('badge/create', [BadgeController::class, 'create'])->name('create');
            Route::post('badge/create', [BadgeController::class, 'store']);
            Route::delete('badge/delete/{id}', [BadgeController::class, 'destroy'])->name('destroy');
        });
});

require __DIR__.'/auth.php';
