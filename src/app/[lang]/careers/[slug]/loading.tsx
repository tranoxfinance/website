import { PageSkeleton, Skeleton } from "@/components/ui/Skeleton";

const LINES = [0, 1, 2, 3, 4, 5];

export default function Loading() {
  return (
    <PageSkeleton>
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="space-y-4">
          <Skeleton className="h-12 w-72" />
          {LINES.map((line) => (
            <Skeleton key={line} className="h-5 w-full max-w-2xl" />
          ))}
        </div>
        <Skeleton className="order-first h-80 lg:order-none" />
      </div>
    </PageSkeleton>
  );
}
