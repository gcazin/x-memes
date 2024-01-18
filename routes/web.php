<?php

use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\Media\MediaController;
use App\Http\Controllers\Media\MediaDownloadController;
use App\Http\Controllers\Media\MediaDuplicateController;
use App\Http\Controllers\Media\MediaImageController;
use App\Http\Controllers\Media\MediaLikeController;
use App\Http\Controllers\Media\MediaRandomController;
use App\Http\Controllers\Media\MediaVideoController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\User\BadgeController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\MediaLikedController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\UserController;
use App\Models\Media;
use Illuminate\Support\Facades\Route;
use Spatie\Health\Http\Controllers\HealthCheckResultsController;

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
Route::get('/', HomeController::class)->name('index');
Route::get('bibliotheque/images', MediaImageController::class)->name('library.image');
Route::get('bibliotheque/videos', MediaVideoController::class)->name('library.video');
Route::get('au-hasard', MediaRandomController::class)->name('random');
Route::get('classement', LeaderboardController::class)->name('leaderboard');

// User
Route::name('user.')->prefix('membre')->group(function () {
    Route::get('{username}', [UserController::class, 'show'])->name('show');
    Route::get('{username}/badges', BadgeController::class)->name('badge.index');
    Route::get('{username}/publications-likees', MediaLikedController::class)->name('media.liked');
});

// Media
Route::name('media.')->prefix('media')->group(function () {
    Route::get('{slug}', [MediaController::class, 'show'])->name('show');
    Route::get('{id}/telecharger', MediaDownloadController::class)->name('download');
});
// Auth
Route::middleware('auth')->group(function () {
    Route::get('/', [MediaController::class, 'index'])->name('index');
    Route::get('rechercher/{query?}', SearchController::class)->name('search');

    Route::name('user.')->group(function () {
        Route::post('suivre/{id}', [FollowController::class, 'store'])->name('follow');
        Route::post('membre/modifier-informations', [UserController::class, 'update'])->name('update');
    });

    Route::name('profile.')->group(function () {
        Route::get('profil', [ProfileController::class, 'edit'])->name('edit');
        Route::put('profil', [ProfileController::class, 'update'])->name('update');
        Route::delete('profil', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::resource('media', MediaController::class)->except(['index', 'create', 'show']);
    Route::name('media.')->prefix('media')->group(function () {
        Route::post('dupliquer', MediaDuplicateController::class)->name('duplicate');
        Route::get('{id}/like', MediaLikeController::class)->name('like');
    });

    Route::resource('notification', NotificationController::class);
    Route::name('notification.')->prefix('notification')->group(function () {
        Route::put('marquer-tout-comme-lu', [NotificationController::class, 'update'])->name('markAllAsRead');
    });

    Route::middleware('role:super-admin')->prefix('admin')->group(function () {
        Route::get('health', HealthCheckResultsController::class);
    });
});

require __DIR__.'/auth.php';
