"use client";

import { useState } from "react";
import { MaterialSymbolsShare, PhBookmarkSimpleLight } from "./Icons";
import { twMerge } from "tailwind-merge";

interface CopyLinkActionProps {
  classToSent?: string;
}

const CopyLinkAction: React.FC<CopyLinkActionProps> = ({ classToSent }) => {
  const [isLieked, setIsLiked] = useState();

  return (
    <button>
      <MaterialSymbolsShare className={twMerge("", classToSent)} />
    </button>
  );
};

export default CopyLinkAction;
