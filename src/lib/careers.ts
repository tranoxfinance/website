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

export async function getOpenJobs(): Promise<PublicJob[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/public/careers`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as PublicJob[];
  } catch {
    return [];
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
