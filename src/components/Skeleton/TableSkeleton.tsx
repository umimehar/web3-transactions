import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TableSkeletonProp = {
  loading?: boolean;
  children: ReactNode;
  rows?: number;
};
export const TableSkeleton = ({
  children,
  loading = false,
  rows = 6,
}: TableSkeletonProp) => {
  if (!loading) {
    return children;
  }
  return (
    <div
      role="status"
      className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      {Array.from({ length: rows }).map((n, ind) => (
        <div
          key={ind}
          className={twMerge(
            "flex items-center justify-between",
            ind != 0 && "pt-4",
          )}
        >
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div className="hidden md:block h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-16" />
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-16" />
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
};
