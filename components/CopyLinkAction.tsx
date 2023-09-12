"use client";

import { useEffect, useState } from "react";
import { MaterialSymbolsShare } from "./Icons";
import { twMerge } from "tailwind-merge";

interface CopyLinkActionProps {
  classToSent?: string;
}

const CopyLinkAction: React.FC<CopyLinkActionProps> = ({ classToSent }) => {
  const [copied, setCopied] = useState<boolean>();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString());
    setCopied(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copied]);

  return (
    <button title="Copy Link" onClick={copyToClipboard}>
      <MaterialSymbolsShare
        className={twMerge("", classToSent, copied && "opacity-30")}
      />
    </button>
  );
};

export default CopyLinkAction;
