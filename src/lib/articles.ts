const API_URL = process.env.TRANOX_API_URL;

export type ArticleCategory = "news" | "press" | "product" | "community";

export interface PublicArticleSummary {
  slug: string;
  title: string;
  excerpt: string | null;
  category: ArticleCategory;
  coverImageUrl: string | null;
  publishedAt: string | null;
}

export interface PublicArticleMedia {
  id: string;
  mediaType: "image" | "video";
  url: string;
}

export interface PublicArticle extends PublicArticleSummary {
  body: string;
  media: PublicArticleMedia[];
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
}

const EMPTY_PAGE = { items: [], total: 0, page: 1 };

export async function getPublishedArticles(
  page = 1,
  limit = 9,
): Promise<PaginatedResult<PublicArticleSummary>> {
  if (!API_URL) return EMPTY_PAGE;
  try {
    const res = await fetch(
      `${API_URL}/public/articles?page=${page}&limit=${limit}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return EMPTY_PAGE;
    return (await res.json()) as PaginatedResult<PublicArticleSummary>;
  } catch {
    return EMPTY_PAGE;
  }
}

export async function getArticleBySlug(
  slug: string,
): Promise<PublicArticle | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(
      `${API_URL}/public/articles/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as PublicArticle;
  } catch {
    return null;
  }
}
