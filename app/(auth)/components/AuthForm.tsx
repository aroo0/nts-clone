"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUserDataSchema } from "@/models/SignUserDataSchema";
import type { SignUserData } from "@/models/SignUserDataSchema";
import Link from "next/link";
import AuthNav from "./AuthNav";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import { AuthError } from "@supabase/supabase-js";
import { twMerge } from "tailwind-merge";

interface AuthFormProps {
  type: Variant;
}

type Variant = "LOGIN" | "REGISTER";

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const continueParam = searchParams.get("continue");
  const supabase = createClientComponentClient<Database>();
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<SignUserData>({
    resolver: zodResolver(SignUserDataSchema),
    mode: "onChange",
  });

  const handleSignIn = async ({ email, password }: SignUserData) => {
    setIsSubmiting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Something went wrong.");
        return new NextResponse("Something went wrong.", { status: 400 });
      }

      router.push(`${location.origin}/${continueParam}`);
    } catch (error) {
      return new NextResponse("Something went wrong.", { status: 400 });
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleSignUp = async ({ email, password }: SignUserData) => {
    setIsSubmiting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError("Something went wrong.");
        return new NextResponse("Something went wrong.", { status: 400 });
      }

      router.push("/join/confirm");
    } catch (error) {
      return new NextResponse("Something went wrong.", { status: 400 });
    } finally {
      setIsSubmiting(false);
    }
  };

  const onSubmit: SubmitHandler<SignUserData> = (data) => {
    if (type === "LOGIN") {
      handleSignIn(data);
    } else {
      handleSignUp(data);
    }
  };

  return (
    <>
      <div className={twMerge("relative grid w-full place-items-center gap-4 border-neutral-700 p-2 pb-12 sm:mt-[-100px] sm:w-auto	sm:border sm:p-8", isSubmitting && "after:absolute after:top-0 after:content-[''] after:w-full after:h-full after:bg-neutral-900/50 cursor-wait")}>
        <h1 className="text-2xl font-extrabold uppercase">MY NTS</h1>
        <div className="grid w-full gap-4">
          <AuthNav type={type} />
          <form
            className="grid w-full place-items-stretch gap-6 p-2 sm:w-[350px]	"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email:
              </label>
              <input
                id="email"
                type="text"
                {...register("email")}
                className="w-full border-b border-neutral-700 bg-black  py-1 text-white placeholder-neutral-400 autofill:bg-black hover:placeholder-neutral-300 focus:border-white focus:outline-none disabled:opacity-40"
                placeholder="EMAIL"
                required
                disabled={isSubmitting}
                autoComplete="email"
              />
              {errors.email && (
                <p className=" py-1 text-sm  text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <label htmlFor="password" className="sr-only">
              Name:
            </label>
            <div className="">
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full border-b border-neutral-700 bg-black  py-1 text-white placeholder-neutral-400 hover:placeholder-neutral-300 focus:border-white focus:outline-none  disabled:opacity-40"
                placeholder="PASSWORD"
                required
                disabled={isSubmitting}
                autoComplete="current-password"
              />

              {errors.password && (
                <p className=" py-1 text-sm  text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              className="w-full bg-white p-3 font-extrabold uppercase text-black disabled:bg-neutral-600"
              disabled={!isDirty || !isValid || isSubmitting}
            >
              {type === "LOGIN" && "Log in"}
              {type === "REGISTER" && "Create Account"}
            </button>
          </form>
        </div>
        <Link
          href="forgot-password"
          className="text-sm font-extrabold uppercase transition hover:opacity-80"
        >
          Forgot password
        </Link>
      </div>
    </>
  );
};

export default AuthForm;
