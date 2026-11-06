import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/PageHero";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getJobBySlug } from "@/lib/careers";
import { cn } from "@/lib/utils";
import { ApplyForm } from "./ApplyForm";

const richTextClass = cn(
  "text-lg leading-relaxed text-ink-soft",
  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
  "[&_h1]:mb-3 [&_h1]:mt-6 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-ink [&_h1]:first:mt-0",
  "[&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-ink [&_h2]:first:mt-0",
  "[&_p]:mb-4 [&_p]:last:mb-0",
  "[&_strong]:font-semibold [&_strong]:text-ink",
);

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const job = await getJobBySlug(slug);
  return {
    title: job
      ? `${job.title} — ${dict.careersPage.metaTitle}`
      : dict.careersPage.metaTitle,
    description: dict.careersPage.metaDescription,
    alternates: localeAlternates(lang, `/careers/${slug}`),
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.careersPage;
  const job = await getJobBySlug(slug);
  if (!job) {
    notFound();
  }

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <Container className="py-4">
          <Link
            href={`/${lang}/careers`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToCareers}
          </Link>
        </Container>
        <PageHero tag={job.department} title={job.title}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[t.employmentTypes[job.employmentType], job.location].map((meta) => (
              <li
                key={meta}
                className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white"
              >
                {meta}
              </li>
            ))}
          </ul>
        </PageHero>
        <div className="h-12 sm:h-16" />

        <section className="pb-16 sm:pb-24">
          <Container className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-tight text-ink">{t.aboutRole}</h2>
              <div
                className={cn("mt-4", richTextClass)}
                dangerouslySetInnerHTML={{ __html: job.description }}
              />

              <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">
                {t.requirements}
              </h2>
              <div
                className={cn("mt-4", richTextClass)}
                dangerouslySetInnerHTML={{ __html: job.requirements }}
              />

              <div id="apply" className="mt-14 rounded-3xl bg-surface p-7 sm:p-10">
                <h2 className="text-2xl font-bold tracking-tight text-ink">{t.applyHeading}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{t.applySub}</p>
                <ApplyForm jobId={job.id} dict={t} />
              </div>
            </div>

            <aside className="order-first lg:order-none">
              <div className="rounded-3xl bg-surface p-6 lg:sticky lg:top-24">
                <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-ink-soft">
                  {t.roleDetails}
                </h2>
                <dl className="mt-4 divide-y divide-border">
                  {[
                    { label: t.department, value: job.department },
                    { label: t.type, value: t.employmentTypes[job.employmentType] },
                    { label: t.location, value: job.location },
                  ].map((row) => (
                    <div key={row.label} className="py-3">
                      <dt className="text-xs text-muted">{row.label}</dt>
                      <dd className="mt-1 font-semibold text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <Button href="#apply" variant="navy" size="lg" className="mt-4 w-full rounded-full">
                  {t.applyNow}
                </Button>
              </div>
            </aside>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
