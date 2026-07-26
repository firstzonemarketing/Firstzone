<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogController;

/*
|--------------------------------------------------------------------------
| API Routes for First Zone Blog Engine
|--------------------------------------------------------------------------
*/

Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);
Route::post('/blogs', [BlogController::class, 'store']);
Route::match(['put', 'post'], '/blogs/{id}/update', [BlogController::class, 'update']);
Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
Route::get('/blog-categories', [BlogController::class, 'categories']);
Route::post('/upload-image', [BlogController::class, 'uploadImage']);
