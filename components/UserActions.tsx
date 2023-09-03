"use client";

import { useState } from "react";
import {
  MaterialSymbolsShare,
  PhBookmarkSimpleLight,
  PhHeartStraightLight,
} from "./Icons";

interface UserActionsProps {}

const UserActions: React.FC<UserActionsProps> = ({}) => {
  const [isLieked, setIsLiked] = useState();

  return (
    <div className="flex gap-4 text-black items-center">
      <button>
        <PhBookmarkSimpleLight className="h-7 w-7" />
      </button>
      <button>
        <PhHeartStraightLight className="h-7 w-7" />
      </button>
      <button>
        <MaterialSymbolsShare className="h-6 w-6" />
      </button>
    </div>
  );
};

export default UserActions;
