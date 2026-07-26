<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('content')->nullable();
            $table->string('featured_image')->nullable();
            $table->text('gallery_images')->nullable(); // JSON stored string
            $table->string('category')->default('Digital Marketing');
            $table->text('tags')->nullable(); // JSON stored string
            $table->string('author')->default('Mohamed Fahad');
            $table->date('publish_date')->nullable();
            $table->string('reading_time')->default('5 min read');
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('keywords')->nullable();
            $table->enum('status', ['published', 'draft'])->default('published');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
