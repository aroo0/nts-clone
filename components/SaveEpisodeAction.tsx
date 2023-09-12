"use client";

import { experimental_useOptimistic as useOptimistic, useState } from "react";
import {
  PhBookmarkSimpleFill,
  PhBookmarkSimpleLight,
} from "./Icons";
import { twMerge } from "tailwind-merge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SaveEpisodeActionProps {
  classToSent?: string;
  data: {
    alias: string;
    img: string;
    name: string;
    date: string;
    showAlias: string;
  };
  existingLike: boolean;
}

const SaveEpisodeAction: React.FC<SaveEpisodeActionProps> = ({
  classToSent,
  data,
  existingLike,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(existingLike);
  const { alias, img, name, date, showAlias } = data;
  const router = useRouter();

  const handleLikeEpisode = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return;
    }
    // Delete like if exist
    if (existingLike) {
      setIsLiked(false);
      const { error } = await supabase
        .from("episodeLikes")
        .delete()
        .eq("user_id", user.id)
        .eq("episode_alias", alias);

      if (error) {
        setIsLiked(true);
        toast.error("Something went wrong. Try again later.");
      } else {
        router.refresh();
      }
      return;
    }

    // Check if episode exist in db
    setIsLiked(true);
    const { data: existingEpisode } = await supabase
      .from("episodes")
      .select()
      .eq("alias", alias);

    // If not, create
    if (!existingEpisode || existingEpisode.length === 0) {
      const { data, error } = await supabase
        .from("episodes")
        .insert({
          alias: alias,
          img: img,
          name: name,
          date: date,
          show_alias: showAlias,
        })
      if (error) {
        setIsLiked(false);
        return toast.error("Something went wrong.");
      }
    }

    const { error } = await supabase.from("episodeLikes").insert({
      user_id: user.id,
      episode_alias: alias,
    });
    if (error) {
      setIsLiked(false);
      return toast.error("Something went wrong.");
    } else {
      router.refresh();
    }
  };

  return (
       <button title='Save Episode' onClick={() => handleLikeEpisode()}>
        {isLiked ? (
          <PhBookmarkSimpleFill className={twMerge("", classToSent)} />
        ) : (
          <PhBookmarkSimpleLight className={twMerge("", classToSent)} />
        )}
      </button>
  );
};

export default SaveEpisodeAction;
