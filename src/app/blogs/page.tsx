"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import BackgroundElements from "@/components/BackgroundElements";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import WorkGallery from "@/components/sections/WorkGallery";
import Footer from "@/components/Footer";
import { getBlogs, getBlogCategories, BlogItem } from "@/lib/api";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, searchTerm, page]);

  const fetchCategories = async () => {
    const cats = await getBlogCategories();
    setCategories(cats);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await getBlogs({
      category: selectedCategory,
      search: searchTerm,
      status: "published",
      page,
      per_page: 9,
    });

    if (res && res.success) {
      setBlogs(res.data || []);
      if (res.meta) {
        setTotalPages(res.meta.last_page || 1);
      }
    }
    setLoading(false);
  };

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const gridBlogs = blogs.length > 1 ? blogs.slice(1) : (blogs.length === 1 ? blogs : []);

  return (
    <div className="relative w-full min-h-screen text-foreground selection:bg-primary-blue selection:text-bg-yellow bg-custom-bg text-custom-fg">
      {/* Background & Cursor */}
      <BackgroundElements />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm border border-primary-blue/20">
            Insights & Knowledge
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight mb-4">
            First Zone Marketing Blog
          </h1>
          <p className="text-base sm:text-lg text-foreground/80 font-medium leading-relaxed">
            Expert strategies on SEO, paid ads, video production, web engineering, and visual branding.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => { setSelectedCategory("all"); setPage(1); }}
              className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 border-2 ${
                selectedCategory === "all"
                  ? "bg-primary-blue text-bg-yellow border-primary-blue shadow-md scale-105"
                  : "glassmorphism text-foreground border-primary-blue/10 hover:border-primary-blue/30"
              }`}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 border-2 ${
                  selectedCategory === cat
                    ? "bg-primary-blue text-bg-yellow border-primary-blue shadow-md scale-105"
                    : "glassmorphism text-foreground border-primary-blue/10 hover:border-primary-blue/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-4 flex items-center text-foreground/40 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search articles & keywords..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3 rounded-2xl glassmorphism border border-primary-blue/15 text-foreground text-xs font-bold placeholder-foreground/40 focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* FEATURED BLOG BANNER */}
        {page === 1 && featuredBlog && !searchTerm && selectedCategory === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 rounded-[32px] glassmorphism-card border-2 border-primary-blue/20 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 group cursor-pointer"
            onClick={() => window.location.href = `/blog/${featuredBlog.slug}`}
          >
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-slate-950">
              <img
                src={featuredBlog.featured_image || "/gallery/work3.jpg"}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 text-xs font-black uppercase tracking-wider bg-primary-blue text-bg-yellow px-3.5 py-1.5 rounded-full shadow-lg border border-white/20">
                Featured Insight
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-3 text-xs font-bold text-foreground/60 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-primary-blue" />
                    {featuredBlog.publish_date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-primary-blue" />
                    {featuredBlog.reading_time || "5 min read"}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-4 group-hover:text-primary-blue transition-colors leading-tight">
                  {featuredBlog.title}
                </h2>

                <p className="text-xs sm:text-sm text-foreground/80 font-medium leading-relaxed mb-6 line-clamp-3">
                  {featuredBlog.short_description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-primary-blue/10 pt-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-blue text-bg-yellow font-black text-xs flex items-center justify-center border border-primary-blue">
                    {featuredBlog.author ? featuredBlog.author.charAt(0) : "F"}
                  </div>
                  <span className="text-xs font-black text-foreground">{featuredBlog.author || "First Zone Team"}</span>
                </div>

                <span className="inline-flex items-center gap-2 text-xs font-black text-primary-blue dark:text-accent-blue group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-4 rounded-[28px] glassmorphism border border-primary-blue/10 shadow animate-pulse">
                <div className="w-full h-48 bg-slate-300 dark:bg-slate-700 rounded-[20px] mb-4" />
                <div className="w-1/3 h-4 bg-slate-300 dark:bg-slate-700 rounded mb-3" />
                <div className="w-full h-6 bg-slate-300 dark:bg-slate-700 rounded mb-2" />
                <div className="w-2/3 h-6 bg-slate-300 dark:bg-slate-700 rounded mb-4" />
                <div className="w-full h-12 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        ) : gridBlogs.length > 0 ? (
          /* BLOG CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridBlogs.map((blog, idx) => (
              <motion.a
                key={blog.id}
                href={`/blog/${blog.slug}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col justify-between p-5 rounded-[28px] glassmorphism-card border-2 border-primary-blue/10 hover:border-primary-blue/40 shadow-lg hover:shadow-2xl hover:shadow-primary-blue/20 transition-all duration-300"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-slate-950 mb-5">
                    <img
                      src={blog.featured_image || "/gallery/work1.jpg"}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 px-2.5 py-1 rounded-full shadow-md">
                      {blog.category}
                    </span>
                  </div>

                  {/* Date & Reading time */}
                  <div className="flex items-center gap-3 text-[11px] font-bold text-foreground/60 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary-blue" />
                      {blog.publish_date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-primary-blue" />
                      {blog.reading_time || "5 min read"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-foreground group-hover:text-primary-blue transition-colors line-clamp-2 leading-snug mb-2">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-foreground/75 font-semibold line-clamp-3 leading-relaxed mb-4">
                    {blog.short_description}
                  </p>
                </div>

                {/* Footer Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-primary-blue/10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-blue/15 text-primary-blue font-black text-[10px] flex items-center justify-center">
                      {blog.author ? blog.author.charAt(0) : "F"}
                    </div>
                    <span className="text-[11px] font-bold text-foreground/75">{blog.author || "First Zone Team"}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-primary-blue dark:text-accent-blue group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="text-center py-20 rounded-[32px] glassmorphism border border-primary-blue/15 flex flex-col items-center gap-4">
            <span className="text-5xl animate-bounce">📝</span>
            <h3 className="font-black text-lg text-foreground">No Articles Found</h3>
            <p className="text-xs text-foreground/75 font-semibold max-w-xs">
              No published articles matched your search query or category filter. Try clearing filters!
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchTerm(""); setPage(1); }}
              className="mt-2 px-5 py-2.5 rounded-2xl bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-xl glassmorphism font-black text-xs text-foreground disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-xs font-black text-foreground px-4">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded-xl glassmorphism font-black text-xs text-foreground disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* OUR WORK GALLERY SECTION ON BLOG PAGE */}
        <div className="mt-24 pt-16 border-t border-primary-blue/15">
          <WorkGallery />
        </div>

      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
