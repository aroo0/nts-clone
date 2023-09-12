"use client";

import { useState } from "react";
import {
  PhBookmarkSimpleLight, PhHeartStraightFill, PhHeartStraightLight,
} from "./Icons";
import { twMerge } from "tailwind-merge";

interface FavoriteShowActionProps {
  classToSent?: string;
  isFavoriteHost: boolean;
  showAlias: string
}

const FavoriteShowAction: React.FC<FavoriteShowActionProps> = ({
  classToSent,
  isFavoriteHost
}) => {
  const [isLiked, setIsLiked] = useState();

  const handleFavorite = () => {

  }

  return (

        <button title='Favorite Host' onClick={() => handleFavorite()}>
        {isLiked ? (
          <PhHeartStraightFill  className={twMerge("", classToSent)} />
        ) : (
          <PhHeartStraightLight className={twMerge("", classToSent)} />
        )}
      </button>
    
  );
};

export default FavoriteShowAction;
