<?php

use App\Http\Controllers\Admin\BadgeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Media\MediaApproveController;
use App\Http\Controllers\Admin\Media\MediaController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['role:super-admin|admin'])->prefix('admin')->name('admin.')
    ->group(function () {
        // Admin dashboard
        Route::get('dashboard', DashboardController::class)->name('index');

        // Users
        Route::get('utilisateurs', [UserController::class, 'index'])->name('user.index');

        // Medias
        Route::name('media.')->group(function () {
            Route::get('medias', [MediaController::class, 'index'])->name('index');
            Route::put('media/{id}', MediaApproveController::class)->name('approve');
        });

        // Tags
        Route::resource('tag', TagController::class)->withTrashed(['show', 'create']);

        // Badges
        Route::resource('badge', BadgeController::class)->withTrashed(['show', 'create']);
    });
