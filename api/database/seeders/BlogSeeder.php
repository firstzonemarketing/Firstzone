<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'Top 10 Digital Marketing Trends to Dominate in 2026',
                'slug' => 'top-10-digital-marketing-trends-2026',
                'short_description' => 'Discover the game-changing AI marketing tactics, video reel algorithms, and search strategies driving customer acquisition this year.',
                'content' => '<h2>The Digital Marketing Landscape in 2026</h2><p>Digital marketing is evolving at unprecedented speed. From generative AI search features to interactive video reels and hyper-targeted ad campaigns, brands must innovate continuously to capture audience attention.</p><h3>1. AI-Powered Personalization & Predictive Analytics</h3><p>Predictive engines allow marketers to forecast consumer intent before a search query is even completed. Utilizing real-time data streams enables hyper-customized landing page experiences that double conversion rates.</p><h3>2. Short-Form Video Dominance</h3><p>Reels, YouTube Shorts, and viral video formats continue to yield the highest organic ROI across all channels.</p><h3>3. Voice & Visual Search Optimization</h3><p>With visual cameras and voice assistants integrated everywhere, optimizing product metadata for visual search engines is essential.</p><blockquote>"Success in modern marketing requires combining high-speed AI tools with genuine human storytelling."</blockquote>',
                'featured_image' => '/gallery/work3.jpg',
                'gallery_images' => ['/gallery/work1.jpg', '/gallery/work2.jpg', '/gallery/work4.jpg'],
                'category' => 'Digital Marketing',
                'tags' => ['Marketing', 'AI Trends', 'SEO', 'Strategy'],
                'author' => 'Mohamed Fahad',
                'publish_date' => '2026-07-20',
                'reading_time' => '6 min read',
                'seo_title' => 'Top 10 Digital Marketing Trends 2026 | First Zone',
                'seo_description' => 'Learn the top 10 marketing trends dominating search and social media in 2026.',
                'keywords' => 'digital marketing, SEO 2026, social media ads, lead generation',
                'status' => 'published',
            ],
            [
                'title' => 'How to Scale Organic Traffic with Next-Gen SEO Strategies',
                'slug' => 'scale-organic-traffic-next-gen-seo',
                'short_description' => 'Unpack our exact blueprint for ranking #1 on Google, driving 400%+ organic traffic growth for modern brands.',
                'content' => '<h2>Search Engine Optimization Re-imagined</h2><p>Google search algorithms now prioritize semantic topic depth, website load velocity, and interactive user signals above traditional backlink building alone.</p><h3>Core Pillars of Modern SEO</h3><ul><li><strong>Core Web Vitals & Speed:</strong> Sub-second page rendering using Next.js and optimized static assets.</li><li><strong>Comprehensive Topic Clusters:</strong> Structuring content into interconnected pillar pages.</li><li><strong>Schema & Entity Optimization:</strong> Helping search bots understand brand entity relationships.</li></ul><p>By executing on these core pillars, First Zone clients regularly achieve multi-fold organic growth within 90 days.</p>',
                'featured_image' => '/gallery/work1.jpg',
                'gallery_images' => ['/gallery/work3.jpg', '/gallery/work5.jpg'],
                'category' => 'SEO & Growth',
                'tags' => ['SEO', 'Google Ranking', 'Organic Search', 'Next.js'],
                'author' => 'Mohamed Fahad',
                'publish_date' => '2026-07-18',
                'reading_time' => '5 min read',
                'seo_title' => 'Scale Organic Search Traffic with Modern SEO | First Zone',
                'seo_description' => 'Discover how to optimize web performance and topic clusters to rank #1 on search engines.',
                'keywords' => 'SEO strategies, Google ranking, organic traffic, web performance',
                'status' => 'published',
            ],
            [
                'title' => 'Building High-Converting Web Architecture for Maximum ROI',
                'slug' => 'building-high-converting-web-architecture',
                'short_description' => 'Why speed, responsive glassmorphism design, and micro-interactions turn casual visitors into loyal high-paying clients.',
                'content' => '<h2>Web Engineering That Converts</h2><p>Your website is your 24/7 digital storefront. A slow or generic website loses up to 70% of potential leads within 3 seconds of landing.</p><h3>The Anatomy of a High-Converting Landing Page</h3><p>Combining modern React architecture with Framer Motion physics creates a visual wow factor while keeping page weight minimal.</p><ul><li>Clear Value Proposition above the fold</li><li>Social Proof & Client Testimonials</li><li>Interactive Service Explorers & Animated Work Portals</li><li>Frictionless Contact & Lead Generation Forms</li></ul>',
                'featured_image' => '/gallery/work5.jpg',
                'gallery_images' => ['/gallery/work2.jpg', '/gallery/work4.jpg'],
                'category' => 'Web Development',
                'tags' => ['Web Dev', 'React', 'UI/UX', 'Conversion Rate'],
                'author' => 'Mohamed Fahad',
                'publish_date' => '2026-07-15',
                'reading_time' => '7 min read',
                'seo_title' => 'High-Converting Web Architecture | First Zone Digital',
                'seo_description' => 'Learn how modern UI/UX design and fast web architecture maximize lead conversion rates.',
                'keywords' => 'web development, conversion rate optimization, UI UX, Next.js',
                'status' => 'published',
            ],
            [
                'title' => 'Mastering Social Media Reels & Brand Visual Identity',
                'slug' => 'mastering-social-media-reels-brand-identity',
                'short_description' => 'Learn how to craft viral video content, high-contrast graphic design, and consistent social brand aesthetics.',
                'content' => '<h2>Visual Storytelling That Captivates</h2><p>In a world of constant scrolling, bold graphic design and dynamic video reels are your primary tool for breaking user attention loops.</p><h3>Elements of Viral Short-Form Video</h3><p>Strong hook in the first 2 seconds, high-energy editing, kinetic typography, and a clear call-to-action drive peak engagement across Meta and YouTube platforms.</p>',
                'featured_image' => '/gallery/work2.jpg',
                'gallery_images' => ['/gallery/work1.jpg', '/gallery/work4.jpg'],
                'category' => 'Social Media',
                'tags' => ['Social Media', 'Reels', 'Graphic Design', 'Branding'],
                'author' => 'Mohamed Fahad',
                'publish_date' => '2026-07-10',
                'reading_time' => '4 min read',
                'seo_title' => 'Social Media Reels & Brand Identity | First Zone',
                'seo_description' => 'Craft viral reels and high-impact graphic design assets for your brand.',
                'keywords' => 'social media marketing, reels creation, video production, graphic design',
                'status' => 'published',
            ],
            [
                'title' => 'The Complete Blueprint for Paid Ads & ROAS Optimization',
                'slug' => 'complete-blueprint-paid-ads-roas-optimization',
                'short_description' => 'How to optimize Google Ads and Meta Ads campaigns for 4.5X+ Return on Ad Spend without overspending.',
                'content' => '<h2>Paid Media Precision</h2><p>Throwing budget at ads without audience profiling leads to high cost-per-click and low conversion rates. This guide details our exact campaign structuring method.</p>',
                'featured_image' => '/gallery/work4.jpg',
                'gallery_images' => ['/gallery/work3.jpg', '/gallery/work5.jpg'],
                'category' => 'Digital Marketing',
                'tags' => ['Google Ads', 'Meta Ads', 'PPC', 'ROAS'],
                'author' => 'Mohamed Fahad',
                'publish_date' => '2026-07-05',
                'reading_time' => '5 min read',
                'seo_title' => 'Paid Ads & ROAS Optimization Blueprint | First Zone',
                'seo_description' => 'Scale your business with high-ROAS Google and Meta ad campaigns.',
                'keywords' => 'Google Ads, Meta Ads, paid marketing, ROAS optimization',
                'status' => 'draft',
            ],
        ];

        foreach ($blogs as $b) {
            Blog::updateOrCreate(['slug' => $b['slug']], $b);
        }
    }
}
