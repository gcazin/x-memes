<?php

use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Media\MediaController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\User\BadgeController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\WaitlistController;
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

if (env('APP_STAGE') === 'alpha' && env('APP_ENV') === 'production') {
    Route::get('/', [HomeController::class, 'index'])
        ->where('any', '.*')->name('index');
    Route::post('/', [WaitlistController::class, 'store'])
        ->where('any', '.*')->name('waitlist.store');
    Route::redirect('{any}', '/');
} else {
    // Common pages
    // TODO: when the site is ready, HomeController
    Route::get('/', [MediaController::class, 'index'])->name('index');
    Route::get('/bibliotheque', [MediaController::class, 'index'])->name('library');
    Route::get('leaderboard', [HomeController::class, 'leaderboard'])->name('leaderboard');
    Route::get('random', [MediaController::class, 'random'])->name('random');
    Route::get('search/{query?}', SearchController::class)->name('search');

    // User
    Route::name('user.')->group(function () {
        Route::get('membre/{username}', [UserController::class, 'show'])->name('show');
        Route::get('membre/{username}/badges', BadgeController::class)->name('badge.index');
    });

    // Media
    Route::name('media.')->group(function () {
        Route::get('media/{id}', [MediaController::class, 'show'])->name('show');
        Route::get('media/{id}/related', [MediaController::class, 'related'])->name('related');
        Route::get('media/{id}/download', [MediaController::class, 'download'])->name('download');
    });
    // Auth
    Route::middleware('auth')->group(function () {
        Route::name('user.')->group(function () {
            Route::post('follow/{id}', [FollowController::class, 'store'])->name('follow');
            Route::post('membre/modifier-informations', [UserController::class, 'update'])->name('update');
        });

        Route::name('profile.')->group(function () {
            Route::get('profile', [ProfileController::class, 'edit'])->name('edit');
            Route::put('profile', [ProfileController::class, 'update'])->name('update');
            Route::delete('profile', [ProfileController::class, 'destroy'])->name('destroy');
        });

        Route::resource('media', MediaController::class)->withTrashed(['index', 'create', 'show']);
        Route::name('media.')->group(function () {
            Route::post('media/duplicate', [MediaController::class, 'duplicate'])->name('duplicate');
            Route::get('media/{id}/like', [MediaController::class, 'like'])->name('like');
        });

        Route::name('notification.')->prefix('notifications')->group(function () {
            Route::get('voir-tout', [NotificationController::class, 'index'])->name('index');
            //            Route::get('media/{id}/like', [MediaController::class, 'like'])->name('like');
        });
    });

    require __DIR__.'/auth.php';

    require __DIR__.'/admin.php';
}
