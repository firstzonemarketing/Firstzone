import { STATIC_BLOGS, BlogItem } from "./blogsData";

export type { BlogItem };

export interface BlogResponse {
  success: boolean;
  data: BlogItem[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface SingleBlogResponse {
  success: boolean;
  data: BlogItem;
  previous_blog?: BlogItem | null;
  next_blog?: BlogItem | null;
  related_blogs?: BlogItem[];
}

/**
 * Fetch all static blogs with optional filters (In-Codebase, 0 Backend Required)
 */
export async function getBlogs(params?: {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  per_page?: number;
}): Promise<BlogResponse> {
  let filtered = [...STATIC_BLOGS];

  if (params?.status && params.status !== "all") {
    filtered = filtered.filter((b) => b.status === params.status);
  }

  if (params?.category && params.category !== "all") {
    filtered = filtered.filter((b) => b.category.toLowerCase() === params.category!.toLowerCase());
  }

  if (params?.search && params.search.trim() !== "") {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.short_description.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q) ||
        (b.keywords && b.keywords.toLowerCase().includes(q))
    );
  }

  const perPage = params?.per_page || 12;
  const page = params?.page || 1;
  const total = filtered.length;
  const lastPage = Math.ceil(total / perPage) || 1;
  const pagedData = filtered.slice((page - 1) * perPage, page * perPage);

  return {
    success: true,
    data: pagedData,
    meta: {
      current_page: page,
      last_page: lastPage,
      per_page: perPage,
      total: total,
    },
  };
}

/**
 * Fetch single blog post by slug or ID
 */
export async function getBlogBySlug(slug: string): Promise<SingleBlogResponse> {
  const blog = STATIC_BLOGS.find((b) => b.slug === slug || String(b.id) === slug);

  if (!blog) {
    return {
      success: false,
      data: null as any,
    };
  }

  const index = STATIC_BLOGS.findIndex((b) => b.id === blog.id);
  const previousBlog = index > 0 ? STATIC_BLOGS[index - 1] : null;
  const nextBlog = index < STATIC_BLOGS.length - 1 ? STATIC_BLOGS[index + 1] : null;

  const relatedBlogs = STATIC_BLOGS.filter(
    (b) => b.category === blog.category && b.id !== blog.id
  ).slice(0, 3);

  return {
    success: true,
    data: blog,
    previous_blog: previousBlog,
    next_blog: nextBlog,
    related_blogs: relatedBlogs,
  };
}

/**
 * Fetch distinct blog categories
 */
export async function getBlogCategories(): Promise<string[]> {
  const categories = Array.from(new Set(STATIC_BLOGS.map((b) => b.category)));
  return categories;
}
