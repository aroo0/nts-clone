import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getLike = async (table: string, column: string, alias: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: like, error } = await supabase
      .from(table)
      .select()
      .eq("user_id", user.id)
      .eq(column, alias);

    if (error) {
      console.log(error);
    }
    return Array.isArray(like) ? like[0] : like;
  }
  return false;
};

export default getLike;
