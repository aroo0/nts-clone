import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface pageProps {}

const Page: React.FC<pageProps> = async ({}) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("email");

  return (
    <div>
      <div>Shows</div>
      {user && profiles?.map(profile => (<p>{profile.email}</p>))}

      <form action="../../auth/sign-out" method="post">
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </form>

    </div>
  );
};

export default Page;
