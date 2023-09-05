"use client";

import { useState } from "react";
import {
  PhBookmarkSimpleLight,
} from "./Icons";
import { twMerge } from "tailwind-merge";

interface FavoriteShowActionProps {
  classToSent?: string
}

const FavoriteShowAction: React.FC<FavoriteShowActionProps> = ({
  classToSent
}) => {
  const [isLieked, setIsLiked] = useState();

  return (
    <div className="flex gap-4 text-black items-center">
      <button>
        <PhBookmarkSimpleLight className={twMerge("", classToSent)} />
      </button>

    </div>
  );
};

export default FavoriteShowAction;
