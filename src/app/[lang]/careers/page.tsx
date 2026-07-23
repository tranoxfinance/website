import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Pager } from "@/components/Pager";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getOpenJobs } from "@/lib/careers";

const PAGE_SIZE = 9;

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return {
    title: dict.careersPage.metaTitle,
    description: dict.careersPage.metaDescription,
    alternates: localeAlternates(lang, "/careers"),
  };
}

export default async function CareersPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.careersPage;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const { items: jobs, total } = await getOpenJobs(page, PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <Container className="max-w-3xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {t.tag}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.heading}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">
              {t.sub}
            </p>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container className="max-w-3xl">
            {jobs.length === 0 ? (
              <p className="rounded-3xl border border-border bg-card p-9 text-center text-ink-soft">
                {t.empty}
              </p>
            ) : (
              <ul className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <Link
                      href={`/${lang}/careers/${job.slug}`}
                      className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-7 transition hover:border-brand sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h2 className="text-lg font-bold text-ink group-hover:text-brand">
                          {job.title}
                        </h2>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            {job.department} ·{" "}
                            {t.employmentTypes[job.employmentType]}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand">
                        {t.viewRole}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Pager
              page={page}
              pageCount={pageCount}
              basePath={`/${lang}/careers`}
              labelPrevious={t.pagerPrevious}
              labelNext={t.pagerNext}
              labelPageTemplate={t.pagerPage}
            />
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
