"use client";

import { PhBookmarkSimpleFill, PhHeartStraightFill } from "@/components/Icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface RemoveButtonProps {
  alias: string;
  variant: variant;
}

type variant = "HOST" | "EPISODE";

const RemoveButton: React.FC<RemoveButtonProps> = ({ alias, variant }) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleRemove = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return;
    }

    const dbAlias = variant === "HOST" ? "show_alias" : "episode_alias";
    const dbTable = variant === "HOST" ? "showLikes" : "episodeLikes";
    const { error } = await supabase
      .from(dbTable)
      .delete()
      .eq("user_id", user.id)
      .eq(dbAlias, alias);

    if (error) {
      toast.error("Something went wrong. Try again later.");
    } else {
      router.refresh();
    }
  };

  return (
    <button
      title={
        variant === "HOST"
          ? "Remove Favourite Host"
          : "Remove Favourite Episode"
      }
      onClick={handleRemove}
    >
      {variant === "HOST" ? (
        <PhHeartStraightFill className="h-4 w-4" />
      ) : (
        <PhBookmarkSimpleFill className="h-4 w-4" />
      )}
    </button>
  );
};

export default RemoveButton;
