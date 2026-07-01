import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";

export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <Container className="max-w-3xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Legal
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-muted">Last updated: {lastUpdated}</p>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container className="max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">{intro}</p>

            <div className="mt-12 space-y-10">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-xl font-bold tracking-tight text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.blocks.map((block, index) =>
                      typeof block === "string" ? (
                        <p
                          key={index}
                          className="text-[15px] leading-relaxed text-ink-soft"
                        >
                          {block}
                        </p>
                      ) : (
                        <ul
                          key={index}
                          className="space-y-2 pl-1 text-[15px] leading-relaxed text-ink-soft"
                        >
                          {block.list.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
