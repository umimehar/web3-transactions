import { CheckIcon } from "@heroicons/react/24/solid";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ComponentProps, useState } from "react";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

type ClipboardCopyProps = {
  value: string;
  className?: ComponentProps<"div">["className"];
};
export const ClipboardCopy = ({
  value,
  className = "",
}: ClipboardCopyProps) => {
  const copyDefaultText = "Click to copy";
  const [copied, setCopied] = useState(false);
  return (
    <div
      className={twMerge(
        "flex w-4 hover:text-blue-700 cursor-pointer",
        className,
      )}
      data-tooltip-id="tooltip"
      data-tooltip-content={copied ? "Copied!" : copyDefaultText}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {!copied ? (
        <DocumentDuplicateIcon className="w-full" />
      ) : (
        <CheckIcon className="w-full text-green-500" />
      )}

      <Tooltip id="tooltip" />
    </div>
  );
};
