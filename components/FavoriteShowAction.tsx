"use client";

import { useEffect, useState } from "react";
import {
  PhHeartStraightFill,
  PhHeartStraightLight,
} from "./Icons";
import { twMerge } from "tailwind-merge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";


interface FavoriteShowActionProps {
  classToSent?: string;
  data: {
    alias: string;
    name: string;
    img: string;
  };
}

const FavoriteShowAction: React.FC<FavoriteShowActionProps> = ({
  classToSent,
  data,
}) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();
  const pathname = usePathname()

  const { alias, name, img } = data;

  useEffect(() => {
    const getIsFavorite = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }
      const { data: like, error } = await supabase
      .from('showLikes')
      .select()
      .eq("user_id", user.id)
      .eq('show_alias', alias);

    if (error) {
      console.log(error);
    }
    setIsFavorite(Array.isArray(like) ? !!like[0] : !!like);
     
    };

    getIsFavorite();
  }, [supabase, setIsFavorite, data]);

  const handleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return router.push(`/sign-in?continue=${pathname}`)
    }
    // Delete like if exist
    if (isFavorite) {
      setIsFavorite(false);
      const { error } = await supabase
        .from("showLikes")
        .delete()
        .eq("user_id", user.id)
        .eq("show_alias", alias);

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
