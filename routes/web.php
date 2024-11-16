<?php

use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\ChangelogController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LocalizationController;
use App\Http\Controllers\Media\Comment\CommentController;
use App\Http\Controllers\Media\Comment\LikeController as CommentLikeController;
use App\Http\Controllers\Media\DownloadController;
use App\Http\Controllers\Media\DuplicateController;
use App\Http\Controllers\Media\LikeController;
use App\Http\Controllers\Media\MediaController;
use App\Http\Controllers\Media\RandomController;
use App\Http\Controllers\Media\TagController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\User\BadgeController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\FollowerController;
use App\Http\Controllers\User\FollowingController;
use App\Http\Controllers\User\LikedController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
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

// Common page
Route::get('/', HomeController::class)->name('index');

// Navbar
Route::get('library', [MediaController::class, 'index'])->name('library');
Route::get('collections', CollectionController::class)->name('collection');
Route::get('random', RandomController::class)->name('random');
Route::get('leaderboard', LeaderboardController::class)->name('leaderboard');
Route::get('random', RandomController::class)->name('random');

// Footer
Route::get('changelog', ChangelogController::class)->name('changelog');

// Blog
Route::name('post.')->prefix('blog')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('index');
    Route::get('article/{slug}', [PostController::class, 'show'])->name('show');
});

// User
Route::name('user.')->prefix('member')->group(function () {
    Route::get('{username}', [UserController::class, 'show'])->name('show');
    Route::get('{username}/badges', BadgeController::class)->name('badge.index');
    Route::get('{username}/liked-publications', LikedController::class)->name('media.liked');
    Route::get('{username}/followers', FollowerController::class)->name('follower.index');
    Route::get('{username}/followings', FollowingController::class)->name('following.index');
});

// Media
Route::name('media.')->prefix('media')->group(function () {
    Route::get('{slug}', [MediaController::class, 'show'])->name('show');
    Route::get('{id}/download', DownloadController::class)->name('download');
});

// Tag
Route::name('tag.')->prefix('tag')->group(function () {
    Route::get('{name}', TagController::class)->name('show');
});

// Auth
Route::middleware('auth')->group(function () {
    Route::get('search', SearchController::class)->name('search');

    Route::name('user.')->group(function () {
        Route::post('follow/{id}', [FollowController::class, 'store'])->name('follow');
        Route::post('member/update-informations', [UserController::class, 'update'])->name('update');
    });

    Route::name('profile.')->group(function () {
        Route::get('profile', [ProfileController::class, 'edit'])->name('edit');
        Route::put('profile', [ProfileController::class, 'update'])->name('update');
        Route::delete('profile', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::resource('media', MediaController::class)->except(['index', 'create', 'show']);
    Route::name('media.')->prefix('media')->group(function () {
        Route::post('duplicate', DuplicateController::class)->name('duplicate');
        Route::get('{id}/like', LikeController::class)->name('like');

        Route::name('comment.')->prefix('commentaire')->group(function () {
            Route::post('{id}', [CommentController::class, 'store'])->name('store');
            Route::put('{id}', [CommentController::class, 'update'])->name('update');
            Route::get('{id}/like', CommentLikeController::class)->name('like');
            Route::delete('{id}', [CommentController::class, 'destroy'])->name('destroy');

            Route::name('reply.')->group(function () {
                Route::post('{id}/reply', [CommentController::class, 'store'])->name('store');
            });
        });
    });

    Route::resource('notification', NotificationController::class);
    Route::name('notification.')->prefix('notification')->group(function () {
        Route::put('read-all-as-read', [NotificationController::class, 'update'])->name('markAllAsRead');
    });

    Route::middleware('role:super-admin')->prefix('admin')->group(function () {
        Route::get('health', HealthCheckResultsController::class);
    });
});

require __DIR__.'/auth.php';

Route::middleware('guest')->group(function () {
    Route::get('auth/redirect/{provider}', [SocialiteController::class, 'redirect'])
        ->name('socialite.redirect');

    Route::get('auth/callback/{provider}', [SocialiteController::class, 'callback'])
        ->name('socialite.callback');
});

// Localization redirection
Route::permanentRedirect('en/{any}', '/{any}')->where('any', '.*');
Route::permanentRedirect('es/{any}', '/{any}')->where('any', '.*');
