<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Helper to sync uploaded files to public storage paths
     */
    private function syncImageToPublicStorage($path)
    {
        try {
            $filename = basename($path);
            $source = storage_path('app/public/' . $path);
            $destinations = [
                base_path('../public/storage/blogs/' . $filename),
                base_path('public/storage/blogs/' . $filename),
                base_path('../storage/app/public/blogs/' . $filename),
                base_path('../api/storage/app/public/blogs/' . $filename),
            ];
            foreach ($destinations as $dest) {
                $dir = dirname($dest);
                if (!file_exists($dir)) {
                    @mkdir($dir, 0775, true);
                }
                if (file_exists($source) && !file_exists($dest)) {
                    @copy($source, $dest);
                }
            }
        } catch (\Throwable $e) {
            // Silence if path inaccessible
        }
    }

    /**
     * Display a listing of blogs with filtering and pagination.
     */
    public function index(Request $request)
    {
        $query = Blog::query();

        // Status Filter
        if ($request->has('status') && !empty($request->status) && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Category Filter
        if ($request->has('category') && !empty($request->category) && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Search Keyword
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('keywords', 'like', "%{$search}%");
            });
        }

        $perPage = (int) $request->get('per_page', 12);
        $blogs = $query->orderBy('publish_date', 'desc')->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $blogs->items(),
            'meta' => [
                'current_page' => $blogs->currentPage(),
                'last_page' => $blogs->lastPage(),
                'per_page' => $blogs->perPage(),
                'total' => $blogs->total(),
            ]
        ]);
    }

    /**
     * Display a single blog by slug or ID.
     */
    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)->orWhere('id', $slug)->first();

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog post not found'
            ], 404);
        }

        // Fetch Previous and Next Blogs
        $previousBlog = Blog::where('status', 'published')
            ->where('id', '<', $blog->id)
            ->orderBy('id', 'desc')
            ->select('id', 'title', 'slug', 'featured_image', 'category')
            ->first();

        $nextBlog = Blog::where('status', 'published')
            ->where('id', '>', $blog->id)
            ->orderBy('id', 'asc')
            ->select('id', 'title', 'slug', 'featured_image', 'category')
            ->first();

        // Fetch Related Blogs
        $relatedBlogs = Blog::where('status', 'published')
            ->where('category', $blog->category)
            ->where('id', '!=', $blog->id)
            ->limit(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $blog,
            'previous_blog' => $previousBlog,
            'next_blog' => $nextBlog,
            'related_blogs' => $relatedBlogs,
        ]);
    }

    /**
     * Store a newly created blog post.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blogs,slug',
            'short_description' => 'nullable|string',
            'content' => 'nullable|string',
            'category' => 'required|string',
            'author' => 'nullable|string',
            'publish_date' => 'nullable|string',
            'reading_time' => 'nullable|string',
            'status' => 'required|in:published,draft',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'keywords' => 'nullable|string',
        ]);

        // Generate Slug
        $slug = !empty($request->slug) ? Str::slug($request->slug) : Str::slug($request->title);
        $originalSlug = $slug;
        $counter = 1;
        while (Blog::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }
        $validated['slug'] = $slug;

        // Handle Featured Image Upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blogs', 'public');
            $this->syncImageToPublicStorage($path);
            $validated['featured_image'] = '/storage/' . $path;
        } elseif ($request->has('featured_image_url')) {
            $validated['featured_image'] = $request->featured_image_url;
        }

        // Handle Gallery Images Upload
        $galleryPaths = [];
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $file) {
                $path = $file->store('blogs', 'public');
                $this->syncImageToPublicStorage($path);
                $galleryPaths[] = '/storage/' . $path;
            }
        } elseif ($request->has('gallery_images_urls')) {
            $galleryPaths = is_array($request->gallery_images_urls) 
                ? $request->gallery_images_urls 
                : json_decode($request->gallery_images_urls, true);
        }
        $validated['gallery_images'] = $galleryPaths;

        // Handle Tags
        if ($request->has('tags')) {
            $tags = $request->tags;
            $validated['tags'] = is_array($tags) ? $tags : array_filter(array_map('trim', explode(',', $tags)));
        }

        $validated['author'] = $request->get('author', 'First Zone Team');
        $validated['publish_date'] = $request->get('publish_date', now()->format('Y-m-d'));
        $validated['reading_time'] = $request->get('reading_time', '5 min read');

        $blog = Blog::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blog post created successfully!',
            'data' => $blog
        ], 201);
    }

    /**
     * Update an existing blog post.
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return response()->json(['success' => false, 'message' => 'Blog post not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blogs,slug,' . $id,
            'short_description' => 'nullable|string',
            'content' => 'nullable|string',
            'category' => 'sometimes|required|string',
            'author' => 'nullable|string',
            'publish_date' => 'nullable|string',
            'reading_time' => 'nullable|string',
            'status' => 'sometimes|required|in:published,draft',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'keywords' => 'nullable|string',
        ]);

        if ($request->has('title') && empty($request->slug)) {
            $validated['slug'] = Str::slug($request->title);
        }

        // Featured Image Upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blogs', 'public');
            $this->syncImageToPublicStorage($path);
            $validated['featured_image'] = '/storage/' . $path;
        } elseif ($request->has('featured_image_url')) {
            $validated['featured_image'] = $request->featured_image_url;
        }

        // Gallery Images Upload
        if ($request->hasFile('gallery_images')) {
            $galleryPaths = [];
            foreach ($request->file('gallery_images') as $file) {
                $path = $file->store('blogs', 'public');
                $this->syncImageToPublicStorage($path);
                $galleryPaths[] = '/storage/' . $path;
            }
            $validated['gallery_images'] = array_merge($blog->gallery_images ?? [], $galleryPaths);
        } elseif ($request->has('gallery_images_urls')) {
            $validated['gallery_images'] = is_array($request->gallery_images_urls) 
                ? $request->gallery_images_urls 
                : json_decode($request->gallery_images_urls, true);
        }

        // Tags
        if ($request->has('tags')) {
            $tags = $request->tags;
            $validated['tags'] = is_array($tags) ? $tags : array_filter(array_map('trim', explode(',', $tags)));
        }

        $blog->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Blog post updated successfully!',
            'data' => $blog
        ]);
    }

    /**
     * Delete a blog post.
     */
    public function destroy($id)
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return response()->json(['success' => false, 'message' => 'Blog post not found'], 404);
        }

        $blog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog post deleted successfully!'
        ]);
    }

    /**
     * Get distinct blog categories.
     */
    public function categories()
    {
        $categories = Blog::select('category')->distinct()->pluck('category');

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * Upload single image.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
        ]);

        $path = $request->file('image')->store('blogs', 'public');
        $this->syncImageToPublicStorage($path);
        $url = '/storage/' . $path;

        return response()->json([
            'success' => true,
            'url' => $url,
            'path' => $path,
        ]);
    }
}
