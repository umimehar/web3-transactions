import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TableSkeletonProp = {
  loading?: boolean;
  children: ReactNode;
  lineClassName?: string;
  wrapperClassName?: string;
  rows?: number;
};
export const LineSkeleton = ({
  children,
  loading = false,
  rows = 6,
  lineClassName = "h-2.5",
  wrapperClassName = "",
}: TableSkeletonProp) => {
  if (!loading) {
    return children;
  }
  return (
    <div role="status" className={`animate-pulse ${wrapperClassName}`}>
      {Array.from({ length: rows }).map((n, ind) => (
        <div key={ind} className={twMerge("flex items-center justify-between")}>
          <div
            className={twMerge(
              `h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2`,
              lineClassName,
            )}
          />
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
};
