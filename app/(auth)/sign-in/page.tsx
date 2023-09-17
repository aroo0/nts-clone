import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AuthForm from "../components/AuthForm";

export const dynamic = 'force-dynamic'


const Login = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <AuthForm type="LOGIN" />
    </div>
  );
};

export default Login;
