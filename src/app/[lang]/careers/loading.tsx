import { PageSkeleton, Skeleton } from "@/components/ui/Skeleton";

const ROWS = [0, 1, 2, 3, 4];

export default function Loading() {
  return (
    <PageSkeleton>
      <Skeleton className="h-14 w-72" />
      <div className="mt-10 space-y-3">
        {ROWS.map((row) => (
          <Skeleton key={row} className="h-24" />
        ))}
      </div>
    </PageSkeleton>
  );
}
