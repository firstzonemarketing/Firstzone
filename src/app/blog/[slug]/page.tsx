import React from "react";
import BlogDetailClient from "@/components/BlogDetailClient";
import { STATIC_BLOGS } from "@/lib/blogsData";

export async function generateStaticParams() {
  return STATIC_BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
