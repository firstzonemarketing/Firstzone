<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

foreach (App\Models\Blog::all() as $b) {
    echo "ID " . $b->id . " | Title: " . $b->title . " | Status: " . $b->status . "\n";
}
