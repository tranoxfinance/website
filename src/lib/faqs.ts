const API_URL = process.env.TRANOX_API_URL;

export interface PublicFaqItem {
  question: string;
  answer: string;
}

export async function getPublishedFaqs(
  language: "en" | "fr",
): Promise<PublicFaqItem[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/public/faqs?lang=${language}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as PublicFaqItem[];
  } catch {
    return [];
  }
}
