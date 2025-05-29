<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// public routes
Route::post('/register', [AuthController::class, 'Register']);
Route::post('/login', [AuthController::class, 'Login']);

// protected routes
Route::middleware('auth:sanctum')->group(function () {
   Route::post('/logout', [AuthController::class, 'Logout']);
});
