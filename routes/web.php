<?php

use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Media\MediaController;
use App\Http\Controllers\Media\MediaDownloadController;
use App\Http\Controllers\Media\MediaDuplicateController;
use App\Http\Controllers\Media\MediaLikeController;
use App\Http\Controllers\Media\MediaRandomController;
use App\Http\Controllers\Media\MediaRelatedController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\User\BadgeController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\UserController;
use App\Models\Media;
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
Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('/bibliotheque', [MediaController::class, 'index'])->name('library');
Route::get('/classement', [HomeController::class, 'leaderboard'])->name('leaderboard');

// User
Route::name('user.')->prefix('membre')->group(function () {
    Route::get('{username}', [UserController::class, 'show'])->name('show');
    Route::get('{username}/badges', BadgeController::class)->name('badge.index');
});

// Media
Route::name('media.')->prefix('media')->group(function () {
    Route::get('{slug}', [MediaController::class, 'show'])->name('show');
    Route::get('{id}/related', MediaRelatedController::class)->name('related');
    Route::get('{id}/download', MediaDownloadController::class)->name('download');
});
// Auth
Route::middleware('auth')->group(function () {
    //    Route::get('/', [MediaController::class, 'index'])->name('index');
    Route::get('rechercher/{query?}', SearchController::class)->name('search');
    Route::get('random', MediaRandomController::class)->name('random');

    Route::name('user.')->group(function () {
        Route::post('suivre/{id}', [FollowController::class, 'store'])->name('follow');
        Route::post('membre/modifier-informations', [UserController::class, 'update'])->name('update');
    });

    Route::name('profile.')->group(function () {
        Route::get('profil', [ProfileController::class, 'edit'])->name('edit');
        Route::put('profil', [ProfileController::class, 'update'])->name('update');
        Route::delete('profil', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::resource('media', MediaController::class)->withTrashed(['index', 'create', 'show']);
    Route::name('media.')->prefix('media')->group(function () {
        Route::post('dupliquer', MediaDuplicateController::class)->name('duplicate');
        Route::get('{id}/like', MediaLikeController::class)->name('like');
    });

    Route::resource('notification', NotificationController::class)->withTrashed(['show']);
    Route::name('notification.')->prefix('notification')->group(function () {
        Route::put('marquer-tout-comme-lu', [NotificationController::class, 'update'])->name('markAllAsRead');
    });
});

require __DIR__.'/auth.php';

require __DIR__.'/admin.php';
