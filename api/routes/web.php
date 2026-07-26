<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'First Zone Digital Marketing API Server', 'status' => 'online']);
});
