"use client";

import { useState } from "react";
import {
  MaterialSymbolsShare,
  PhBookmarkSimpleLight,
  PhHeartStraightLight,
} from "./Icons";
import { twMerge } from "tailwind-merge";

interface SaveEpisodeActionProps {
  classToSent?: string
}

const SaveEpisodeAction: React.FC<SaveEpisodeActionProps> = ({
  classToSent
}) => {
  const [isLieked, setIsLiked] = useState();

  return (

      <button>
        <PhHeartStraightLight className={twMerge("", classToSent)} />
      </button>
  );
};

export default SaveEpisodeAction;
