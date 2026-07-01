import { cn } from "@/lib/utils";

export function TranoxMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-10 w-10", className)}
      aria-hidden
    >
      <rect width="40" height="40" rx="10" fill="#0d8fd2" />
      <path
        d="M 8 14 L 27 14 M 21 8 L 27 14 L 21 20"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 32 26 L 13 26 M 19 20 L 13 26 L 19 32"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
