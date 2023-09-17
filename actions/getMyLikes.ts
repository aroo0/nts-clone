import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type agregator = "Shows" | "Episodes";

export const dynamic = 'force-dynamic'


const getMyLikes = async (table: string, agregator: agregator) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const selector = agregator === "Shows" ? "*, shows(*)" : "*, episodes(*)";

  const { data, error } = await supabase
    .from(table)
    .select(selector)
    .eq("user_id", user.id);

  if (error) {
    console.log(error);
  }

  return data || [];
};

export default getMyLikes;
