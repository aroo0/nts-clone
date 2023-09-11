import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface AuthNavProps {
  type: "LOGIN" | "REGISTER";
}

const AuthNav: React.FC<AuthNavProps> = ({ type }) => {
  return (
    <nav className="grid w-full grid-cols-2 gap-2 border-b border-neutral-700 font-extrabold uppercase text-neutral-400  text-sm">
      <Link
        className={twMerge(
          "w-full border-b-2 border-transparent py-3  text-center",
          type === "REGISTER" ? "border-white  text-white" : "hover:opacity-80",
        )}
        href={`/join`}
      >
        Sign up
      </Link>
      <Link
       className={twMerge(
        "w-full border-b-2 border-transparent py-3 text-center",
          type === "LOGIN" ? "border-white  text-white" : "hover:opacity-80",
        )}
        href={`/sign-in`}
      >
        Log in
      </Link>
    </nav>
  );
};

export default AuthNav;
