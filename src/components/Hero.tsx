import { Container } from "@/components/ui/Container";
import { StoreBadges } from "@/components/StoreBadges";
import { TypewriterHeadline } from "@/components/TypewriterHeadline";

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/70 via-background to-background" />
        <div className="absolute inset-0 grid-bg mask-fade-y opacity-50" />
        <div className="absolute -right-20 top-0 hidden h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--color-brand)_0%,transparent_60%)] opacity-[0.12] blur-2xl sm:block" />
        <div className="absolute -left-32 top-40 hidden h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,var(--color-gold)_0%,transparent_60%)] opacity-[0.10] blur-2xl sm:block" />
      </div>

      <Container className="flex flex-col items-center gap-8 pb-16 pt-28 text-center lg:pb-24 lg:pt-36">
        <div className="animate-[rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both] max-w-2xl">
          <TypewriterHeadline className="text-[2.7rem] font-bold leading-[1.03] tracking-tight text-ink sm:text-[3.4rem]" />

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Tranox moves money both ways between Nigeria (NGN) and Ivory Coast
            (XOF) in minutes. Transparent rates, low fees, bank-grade security.
            Fast. Secure. Global.
          </p>

          <div className="mt-8 flex justify-center">
            <StoreBadges />
          </div>

          <p className="mt-6 text-sm font-medium text-ink-soft">
            Cross-border payments built for West Africa
          </p>
        </div>
      </Container>
    </section>
  );
}
