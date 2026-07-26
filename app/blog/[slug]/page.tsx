import React from "react";
import BlogDetailClient from "@/components/BlogDetailClient";

export async function generateStaticParams() {
  // Pre-render static paths for blog posts (required with output: export config)
  return [
    { slug: "top-10-digital-marketing-trends-2026" },
    { slug: "scale-organic-traffic-next-gen-seo" },
    { slug: "building-high-converting-web-architecture" },
    { slug: "mastering-social-media-reels-brand-identity" },
    { slug: "complete-blueprint-paid-ads-roas-optimization" },
  ];
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
