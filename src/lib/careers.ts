const API_URL = process.env.TRANOX_API_URL;

export type JobEmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship";

export interface PublicJob {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: JobEmploymentType;
  publishedAt: string | null;
  closesAt: string | null;
}

export interface PublicJobDetail extends PublicJob {
  description: string;
  requirements: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
}

const EMPTY_PAGE = { items: [], total: 0, page: 1 };

export async function getOpenJobs(
  page = 1,
  limit = 9,
): Promise<PaginatedResult<PublicJob>> {
  if (!API_URL) return EMPTY_PAGE;
  try {
    const res = await fetch(
      `${API_URL}/public/careers?page=${page}&limit=${limit}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return EMPTY_PAGE;
    return (await res.json()) as PaginatedResult<PublicJob>;
  } catch {
    return EMPTY_PAGE;
  }
}

export async function getJobBySlug(
  slug: string,
): Promise<PublicJobDetail | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(
      `${API_URL}/public/careers/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as PublicJobDetail;
  } catch {
    return null;
  }
}
