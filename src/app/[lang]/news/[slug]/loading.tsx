import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

const LINES = [0, 1, 2, 3, 4, 5, 6];

export default function Loading() {
  return (
    <main className="flex-1 pb-16 pt-28 sm:pb-24" aria-busy="true">
      <Container className="max-w-3xl">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-8 h-12 w-full" />
        <Skeleton className="mt-3 h-12 w-3/4" />
        <Skeleton className="mt-6 h-6 w-5/6" />
      </Container>
      <Container className="mt-10 max-w-5xl">
        <Skeleton className="aspect-video" />
      </Container>
      <Container className="mt-10 max-w-3xl space-y-4">
        {LINES.map((line) => (
          <Skeleton key={line} className="h-5 w-full" />
        ))}
      </Container>
    </main>
  );
}
