import { PageSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <PageSkeleton>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Skeleton className="h-14 w-64" />
        <Skeleton className="h-12 w-80 rounded-full" />
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>
    </PageSkeleton>
  );
}
