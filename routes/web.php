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
    Route::get('random', MediaRandomController::class)->name('random');
    Route::get('search/{query?}', SearchController::class)->name('search');

    // User
    Route::name('user.')->group(function () {
        Route::get('membre/{username}', [UserController::class, 'show'])->name('show');
        Route::get('membre/{username}/badges', BadgeController::class)->name('badge.index');
    });

    // Media
    Route::name('media.')->group(function () {
        Route::get('media/{id}', [MediaController::class, 'show'])->name('show');
        Route::get('media/{id}/related', MediaRelatedController::class)->name('related');
        Route::get('media/{id}/download', MediaDownloadController::class)->name('download');
    });
    // Auth
    Route::middleware('auth')->group(function () {
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
        Route::name('media.')->group(function () {
            Route::post('media/dupliquer', MediaDuplicateController::class)->name('duplicate');
            Route::get('media/{id}/like', MediaLikeController::class)->name('like');
        });

        Route::name('notification.')->prefix('notifications')->group(function () {
            Route::get('voir-tout', [NotificationController::class, 'index'])->name('index');
        });
    });

    require __DIR__.'/auth.php';

    require __DIR__.'/admin.php';
}
