"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Calendar, Clock, Share2, Copy, Check, 
  ChevronLeft, ChevronRight, Sparkles, Tag, ArrowRight 
} from "lucide-react";
import BackgroundElements from "@/components/BackgroundElements";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import { getBlogBySlug, BlogItem } from "@/lib/api";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [previousBlog, setPreviousBlog] = useState<BlogItem | null>(null);
  const [nextBlog, setNextBlog] = useState<BlogItem | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    fetchBlogData();
  }, [slug]);

  const fetchBlogData = async () => {
    setLoading(true);
    const res = await getBlogBySlug(slug);
    if (res && res.success && res.data) {
      setBlog(res.data);
      setPreviousBlog(res.previous_blog || null);
      setNextBlog(res.next_blog || null);
      setRelatedBlogs(res.related_blogs || []);
    } else {
      setBlog(null);
    }
    setLoading(false);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="relative w-full min-h-screen text-foreground bg-custom-bg flex flex-col items-center justify-center p-8">
        <BackgroundElements />
        <CustomCursor />
        <Navbar />
        <div className="max-w-3xl w-full p-8 rounded-[32px] glassmorphism border border-primary-blue/15 shadow animate-pulse space-y-6">
          <div className="h-64 bg-slate-300 dark:bg-slate-700 rounded-[24px] w-full" />
          <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/4" />
          <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="relative w-full min-h-screen text-foreground bg-custom-bg flex flex-col items-center justify-center p-8 text-center">
        <BackgroundElements />
        <CustomCursor />
        <Navbar />
        <div className="max-w-md p-10 rounded-[32px] glassmorphism border border-primary-blue/20 shadow-2xl flex flex-col items-center gap-4">
          <span className="text-6xl animate-bounce">🔍</span>
          <h1 className="text-2xl font-black text-foreground">Article Not Found</h1>
          <p className="text-xs text-foreground/75 font-semibold">
            The blog post you requested could not be located in our database parameters.
          </p>
          <a
            href="/blogs"
            className="mt-4 px-6 py-3 rounded-2xl bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow border border-primary-blue"
          >
            Explore All Blogs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen text-foreground selection:bg-primary-blue selection:text-bg-yellow bg-custom-bg text-custom-fg">
      <BackgroundElements />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-black uppercase tracking-wider bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 px-3.5 py-1 rounded-full shadow border border-white/20">
            {blog.category}
          </span>
          <span className="text-xs font-bold text-foreground/60 flex items-center gap-1.5">
            <Calendar size={14} className="text-primary-blue" />
            {blog.publish_date}
          </span>
          <span className="text-foreground/30">•</span>
          <span className="text-xs font-bold text-foreground/60 flex items-center gap-1.5">
            <Clock size={14} className="text-primary-blue" />
            {blog.reading_time || "5 min read"}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Author & Share Bar */}
        <div className="flex items-center justify-between py-4 border-y border-primary-blue/10 mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-blue text-bg-yellow font-black text-sm flex items-center justify-center shadow">
              {blog.author ? blog.author.charAt(0) : "F"}
            </div>
            <div>
              <p className="text-xs font-black text-foreground">{blog.author || "First Zone Team"}</p>
              <p className="text-[10px] font-semibold text-foreground/60">Digital Marketing Specialists</p>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 text-xs font-black px-4 py-2 rounded-xl glassmorphism border border-primary-blue/15 hover:bg-primary-blue/10 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
            <span>{copied ? "Link Copied!" : "Share Article"}</span>
          </button>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-[32px] overflow-hidden bg-slate-950 shadow-2xl border-2 border-primary-blue/20 mb-10">
          <img
            src={blog.featured_image || "/gallery/work1.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose dark:prose-invert max-w-none text-foreground/90 font-medium leading-relaxed mb-12 text-sm sm:text-base space-y-4">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-6 border-t border-primary-blue/10 mb-12">
            <Tag size={14} className="text-primary-blue" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-black uppercase tracking-wider bg-primary-blue/10 text-primary-blue dark:text-accent-blue px-3 py-1 rounded-full border border-primary-blue/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Prev / Next Pagination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {previousBlog ? (
            <a
              href={`/blog/${previousBlog.slug}`}
              className="p-5 rounded-2xl glassmorphism-card border border-primary-blue/15 hover:border-primary-blue/40 flex items-center gap-3 group text-left"
            >
              <ChevronLeft size={20} className="text-primary-blue group-hover:-translate-x-1 transition-transform flex-shrink-0" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-foreground/50">Previous Article</span>
                <h4 className="text-xs font-black text-foreground line-clamp-1 group-hover:text-primary-blue transition-colors">
                  {previousBlog.title}
                </h4>
              </div>
            </a>
          ) : <div />}

          {nextBlog ? (
            <a
              href={`/blog/${nextBlog.slug}`}
              className="p-5 rounded-2xl glassmorphism-card border border-primary-blue/15 hover:border-primary-blue/40 flex items-center justify-end gap-3 group text-right"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-foreground/50">Next Article</span>
                <h4 className="text-xs font-black text-foreground line-clamp-1 group-hover:text-primary-blue transition-colors">
                  {nextBlog.title}
                </h4>
              </div>
              <ChevronRight size={20} className="text-primary-blue group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </a>
          ) : <div />}
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="pt-10 border-t border-primary-blue/10">
            <h3 className="text-xl sm:text-2xl font-black text-foreground mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedBlogs.map((rel) => (
                <a
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-4 rounded-2xl glassmorphism-card border border-primary-blue/15 hover:border-primary-blue/40 group flex items-center gap-4"
                >
                  <img
                    src={rel.featured_image}
                    alt={rel.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-slate-950"
                  />
                  <div>
                    <span className="text-[9px] font-black uppercase text-primary-blue">{rel.category}</span>
                    <h4 className="text-xs font-black text-foreground line-clamp-2 group-hover:text-primary-blue transition-colors mt-0.5">
                      {rel.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
