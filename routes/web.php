<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Commentscontroller;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/add', function () {
    return Inertia::render('AddProduct', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('add');

Route::get('/edit/{id}', function ($id) {
    $product = Product::findOrFail($id); 
    return Inertia::render('EditProduct', [
        'product' => $product,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('edit');

Route::get('/buy/{id}', function ($id) {
    $product = Product::findOrFail($id); 
    return Inertia::render('BuyProduct', [
        'product' => $product,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('buy');

Route::post('/products/{productId}/comments', [CommentsController::class, 'store']);
Route::get('/products/{productId}/comments', [CommentsController::class, 'index']);
Route::delete('/comments/{id}', [CommentsController::class, 'destroy']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('api')->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::get('/products/{id}', [ProductController::class, 'show']); 
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); 
});

require __DIR__.'/auth.php';

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
