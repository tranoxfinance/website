import { PageSkeleton, Skeleton } from "@/components/ui/Skeleton";

const CARDS = [0, 1, 2];

export default function Loading() {
  return (
    <PageSkeleton>
      <Skeleton className="h-96" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <div key={card} className="space-y-4">
            <Skeleton className="aspect-cover" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        ))}
      </div>
    </PageSkeleton>
  );
}
