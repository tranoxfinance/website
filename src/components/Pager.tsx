import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PagerProps {
  page: number;
  pageCount: number;
  basePath: string;
  labelPrevious: string;
  labelNext: string;
  /** Template containing {page} and {pageCount} placeholders. */
  labelPageTemplate: string;
}

function pageHref(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export function Pager({
  page,
  pageCount,
  basePath,
  labelPrevious,
  labelNext,
  labelPageTemplate,
}: PagerProps) {
  if (pageCount <= 1) {
    return null;
  }
  const hasPrevious = page > 1;
  const hasNext = page < pageCount;
  const labelPage = labelPageTemplate
    .replace("{page}", String(page))
    .replace("{pageCount}", String(pageCount));

  const pillClass =
    "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition";
  const activeClass = "bg-surface text-ink-soft hover:text-ink";
  const disabledClass = "cursor-not-allowed bg-surface/50 text-muted";

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-3"
    >
      {hasPrevious ? (
        <Link href={pageHref(basePath, page - 1)} className={cn(pillClass, activeClass)}>
          <ChevronLeft className="h-4 w-4" />
          {labelPrevious}
        </Link>
      ) : (
        <span className={cn(pillClass, disabledClass)}>
          <ChevronLeft className="h-4 w-4" />
          {labelPrevious}
        </span>
      )}
      <span className="text-sm font-medium text-ink-soft">{labelPage}</span>
      {hasNext ? (
        <Link href={pageHref(basePath, page + 1)} className={cn(pillClass, activeClass)}>
          {labelNext}
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(pillClass, disabledClass)}>
          {labelNext}
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
