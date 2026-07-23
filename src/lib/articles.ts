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

export async function getPublishedArticles(): Promise<PublicArticleSummary[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/public/articles`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as PublicArticleSummary[];
  } catch {
    return [];
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
