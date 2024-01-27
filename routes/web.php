<?php

use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\ChangelogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\Media\Comment\CommentController;
use App\Http\Controllers\Media\Comment\LikeController as CommentLikeController;
use App\Http\Controllers\Media\Comment\ReplyCommentController;
use App\Http\Controllers\Media\DownloadController;
use App\Http\Controllers\Media\DuplicateController;
use App\Http\Controllers\Media\ImageController;
use App\Http\Controllers\Media\LikeController;
use App\Http\Controllers\Media\MediaController;
use App\Http\Controllers\Media\RandomController;
use App\Http\Controllers\Media\VideoController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\User\BadgeController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\LikedController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\UserController;
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
Route::get('bibliotheque/images', ImageController::class)->name('library.image');
Route::get('bibliotheque/videos', VideoController::class)->name('library.video');
Route::get('au-hasard', RandomController::class)->name('random');
Route::get('classement', LeaderboardController::class)->name('leaderboard');
Route::get('journal-des-modifications', ChangelogController::class)->name('changelog');

// User
Route::name('user.')->prefix('membre')->group(function () {
    Route::get('{username}', [UserController::class, 'show'])->name('show');
    Route::get('{username}/badges', BadgeController::class)->name('badge.index');
    Route::get('{username}/publications-likees', LikedController::class)->name('media.liked');
});

// Media
Route::name('media.')->prefix('media')->group(function () {
    Route::get('{slug}', [MediaController::class, 'show'])->name('show');
});

// Auth
Route::middleware('auth')->group(function () {
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
        Route::post('dupliquer', DuplicateController::class)->name('duplicate');
        Route::get('{id}/like', LikeController::class)->name('like');
        Route::get('{id}/telecharger', DownloadController::class)->name('download');

        Route::name('comment.')->prefix('commentaire')->group(function () {
            Route::post('{id}', [CommentController::class, 'store'])->name('store');
            Route::put('{id}', [CommentController::class, 'update'])->name('update');
            Route::get('{id}/like', CommentLikeController::class)->name('like');
            Route::delete('{id}', [CommentController::class, 'destroy'])->name('destroy');

            Route::name('reply.')->group(function () {
                Route::post('{id}/repondre', [CommentController::class, 'store'])->name('store');
            });
        });
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
