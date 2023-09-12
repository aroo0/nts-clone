"use client";

import { useState } from "react";
import {
  PhBookmarkSimpleLight,
  PhHeartStraightFill,
  PhHeartStraightLight,
} from "./Icons";
import { twMerge } from "tailwind-merge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FavoriteShowActionProps {
  classToSent?: string;
  isFavoriteHost: boolean;
  data: {
    alias: string;
    name: string;
    img: string;
  };
}

const FavoriteShowAction: React.FC<FavoriteShowActionProps> = ({
  classToSent,
  isFavoriteHost,
  data,
}) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteHost);

  const { alias, name, img } = data;

  const handleFavorite = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return;
    }
    // Delete like if exist
    if (isFavoriteHost) {
      setIsFavorite(false);
      const { error } = await supabase
        .from("showLikes")
        .delete()
        .eq("user_id", user.id)
        .eq("alias", alias);

      if (error) {
        setIsFavorite(true);
        toast.error("Something went wrong. Try again later.");
      } else {
        router.refresh();
      }
      return;
    }

    // Check if episode exist in db
    setIsFavorite(true);
    const { data: existingShow } = await supabase
      .from("shows")
      .select()
      .eq("alias", alias);

    // If not, create
    if (!existingShow || existingShow.length === 0) {
      const { error } = await supabase.from("shows").insert({
        alias: alias,
        img: img,
        name: name,
      });
      if (error) {
        setIsFavorite(false);
        return toast.error("Something went wrong.");
      }
    }

    const { error } = await supabase.from("showLikes").insert({
      user_id: user.id,
      show_alias: alias,
    });
    if (error) {
      setIsFavorite(false);
      return toast.error("Something went wrong.");
    } else {
      router.refresh();
    }
  };

  return (
    <button title="Favorite Host" onClick={() => handleFavorite()}>
      {isFavorite ? (
        <PhHeartStraightFill className={twMerge("", classToSent)} />
      ) : (
        <PhHeartStraightLight className={twMerge("", classToSent)} />
      )}
    </button>
  );
};

export default FavoriteShowAction;
