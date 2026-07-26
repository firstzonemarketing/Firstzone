<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$blog = App\Models\Blog::find(5);
echo "Before Update - ID 5 Status: " . $blog->status . "\n";

$blog->update(['status' => 'published']);

$blogRefresh = App\Models\Blog::find(5);
echo "After Update - ID 5 Status: " . $blogRefresh->status . "\n";
