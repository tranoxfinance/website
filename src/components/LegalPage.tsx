import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

interface LegalContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

interface LegalPageProps {
  lang: Locale;
  dict: Dictionary;
  page: LegalContent;
}

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function LegalPage({ lang, dict, page }: LegalPageProps) {
  const sections = page.sections.map((section) => ({
    ...section,
    id: slugify(section.heading),
  }));

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} overlay />
      <main className="flex-1">
        <PageHero
          tag={dict.legalPage.tag}
          title={page.title}
          sub={dict.legalPage.lastUpdated.replace("{date}", page.lastUpdated)}
        />

        <section className="pb-20 pt-12 sm:pb-28 sm:pt-16">
          <Container className="grid max-w-6xl gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
            <aside className="hidden lg:block">
              <nav
                aria-label={dict.legalPage.onThisPage}
                className="sticky top-24 rounded-panel bg-surface p-6"
              >
                <p className="text-xs font-medium text-ink-soft">
                  {dict.legalPage.onThisPage}
                </p>
                <ol className="mt-4 space-y-2.5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block text-sm leading-snug text-ink-soft transition hover:text-ink"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0 max-w-3xl">
              <p className="text-xl leading-relaxed text-ink">{page.intro}</p>

              <div className="mt-12 space-y-2">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="py-10 first:pt-0">
                    <h2 className="text-2xl font-bold text-ink">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.blocks.map((block, index) =>
                        typeof block === "string" ? (
                          <p key={index} className="text-lg leading-relaxed text-ink-soft">
                            {block}
                          </p>
                        ) : (
                          <ul
                            key={index}
                            className="list-disc space-y-2 pl-5 text-lg leading-relaxed text-ink-soft marker:text-brand"
                          >
                            {block.list.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
