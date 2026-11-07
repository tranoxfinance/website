import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  onDark?: boolean;
}

export function Skeleton({ className, onDark = false }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-panel",
        onDark ? "bg-on-dark-fill" : "bg-surface-strong",
        className,
      )}
    />
  );
}

export function PageSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1" aria-busy="true">
      <section className="bg-navy">
        <Container className="flex h-16 items-center">
          <Image src="/tranox-logo.svg" alt="" width={1139} height={284} unoptimized priority className="h-8 w-auto brightness-0 invert sm:h-9" />
        </Container>
        <Container className="pb-24 pt-20 sm:pb-28 sm:pt-28">
          <Skeleton onDark className="h-9 w-40 rounded-none" />
          <Skeleton onDark className="mt-6 h-16 w-full max-w-3xl sm:h-20" />
          <Skeleton onDark className="mt-3 h-16 w-2/3 max-w-2xl sm:h-20" />
          <Skeleton onDark className="mt-8 h-6 w-full max-w-xl" />
          <Skeleton onDark className="mt-3 h-6 w-4/5 max-w-lg" />
        </Container>
      </section>
      <Container className="py-16 sm:py-24">{children}</Container>
    </main>
  );
}
