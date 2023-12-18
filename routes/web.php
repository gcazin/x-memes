<?php

use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Media\MediaController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\WaitlistController;
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
    Route::get('/', [WaitlistController::class, 'index'])
        ->where('any', '.*');
    Route::post('/', [WaitlistController::class, 'store'])
        ->where('any', '.*')->name('waitlist.store');
    Route::redirect('{any}', '/');
} else {
    // Common pages
    Route::get('/', [MediaController::class, 'index'])->name('index');
    // Auth
    Route::middleware('auth')->group(function () {
        Route::name('user.')->group(function () {
            Route::get('membre/{username}', [UserController::class, 'show'])->name('show');
            Route::get('membre/{username}/badges', [UserController::class, 'badges'])->name('badges');
            Route::post('follow/{id}', [FollowController::class, 'store'])->name('follow');
        });

        Route::name('profile.')->group(function () {
            Route::get('profile', [ProfileController::class, 'edit'])->name('edit');
            Route::put('profile', [ProfileController::class, 'update'])->name('update');
            Route::delete('profile', [ProfileController::class, 'destroy'])->name('destroy');
        });

        Route::get('leaderboard', [HomeController::class, 'leaderboard'])->name('leaderboard');
        Route::get('random', [MediaController::class, 'random'])->name('random');
        Route::resource('media', MediaController::class)->withTrashed(['index', 'create']);
        Route::name('media.')->group(function () {
            Route::post('media/duplicate', [MediaController::class, 'duplicate'])->name('duplicate');
            Route::get('media/download/{id}', [MediaController::class, 'download'])->name('download');
        });
    });

    require __DIR__.'/auth.php';

    require __DIR__.'/admin.php';
}
