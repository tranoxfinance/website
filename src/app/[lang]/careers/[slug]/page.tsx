import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getJobBySlug } from "@/lib/careers";
import { cn } from "@/lib/utils";
import { ApplyForm } from "./ApplyForm";

const richTextClass = cn(
  "text-[15px] leading-relaxed text-ink-soft",
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
        <section className="border-b border-border bg-surface py-14 sm:py-16">
          <Container className="max-w-3xl">
            <Link
              href={`/${lang}/careers`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backToCareers}
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {job.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {job.department} · {t.employmentTypes[job.employmentType]}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container className="max-w-3xl">
            <h2 className="text-xl font-bold text-ink">{t.aboutRole}</h2>
            <div
              className={cn("mt-4", richTextClass)}
              dangerouslySetInnerHTML={{ __html: job.description }}
            />

            <h2 className="mt-10 text-xl font-bold text-ink">
              {t.requirements}
            </h2>
            <div
              className={cn("mt-4", richTextClass)}
              dangerouslySetInnerHTML={{ __html: job.requirements }}
            />

            <div id="apply" className="mt-12 rounded-3xl border border-border bg-card p-7 sm:p-9">
              <h2 className="text-xl font-bold text-ink">{t.applyHeading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t.applySub}
              </p>
              <ApplyForm jobId={job.id} dict={t} />
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
