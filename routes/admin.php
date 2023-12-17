<?php

use App\Http\Controllers\Admin\BadgeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Media\MediaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['role:superadmin|admin'])->prefix('admin')->name('admin.')
    ->group(function () {
        // Admin dashboard
        Route::get('dashboard', [DashboardController::class, 'index'])->name('index');

        // Users
        Route::get('utilisateurs', [DashboardController::class, 'users'])->name('user.index');

        // Medias
        Route::name('media.')->group(function () {
            Route::get('medias', [DashboardController::class, 'medias'])->name('index');
            Route::patch('media/{id}', [MediaController::class, 'approve'])->name('approve');
        });

        // Tags
        Route::resource('tag', TagController::class)->withTrashed(['show', 'create']);

        // Badges
        Route::resource('badge', BadgeController::class)->withTrashed(['show', 'create']);
    });
