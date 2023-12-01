<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TagController;
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

Route::get('/', [MediaController::class, 'index'])->name('home');
Route::get('/leaderboard', [HomeController::class, 'leaderboard'])->name('leaderboard');

Route::middleware('auth')->group(function() {
    Route::name('user.')->group(function() {
        Route::get('user/{id}', [UserController::class, 'show'])->name('show');
    });

    Route::name('profile.')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::name('media.')->prefix('library')->group(function() {
        Route::get('create', [MediaController::class, 'create'])->name('create');
        Route::post('create', [MediaController::class, 'store']);
        Route::get('media/{id}', [MediaController::class, 'show'])->name('show');
        Route::patch('media/{id}', [MediaController::class, 'approve'])->name('approve');
        Route::delete('media/{id}', [MediaController::class, 'destroy'])->name('destroy');
        Route::get('random', [MediaController::class, 'random'])->name('random');
        Route::post('media/duplicate', [MediaController::class, 'duplicate'])->name('duplicate');
    });

    Route::middleware('verified')->group(function() {
        Route::middleware('role:super-admin')
            ->prefix('admin')
            ->name('admin.')
            ->group(function() {
                Route::get('dashboard', [DashboardController::class, 'index'])->name('index');
                Route::get('medias', [DashboardController::class, 'medias'])->name('medias');
                Route::get('utilisateurs', [DashboardController::class, 'users'])->name('users');
                Route::get('tags', [DashboardController::class, 'tags'])->name('tags');
            });

         Route::middleware('role:admin|super-admin')->prefix('admin')->name('admin.tag.')->group(function () {
             Route::get('tag/create', [TagController::class, 'create'])->name('create');
             Route::post('tag/create', [TagController::class, 'store']);
             Route::delete('tag/delete/{name}', [TagController::class, 'destroy'])->name('destroy');
         });
    });

//    Route::get('library', [MediaController::class, 'index'])->name('library');
});

require __DIR__.'/auth.php';
