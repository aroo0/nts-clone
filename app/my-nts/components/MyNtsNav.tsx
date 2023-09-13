import React from "react";
import { twMerge } from "tailwind-merge";
import { headers } from "next/headers";
import Link from "next/link";
import { PhCaretRightBold } from "@/components/Icons";

const MyNtsNav = ({ children }: { children: React.ReactNode }) => {
  const headersList = headers();
  const pathname = (headersList.get("x-invoke-path") || "").split("/");
  const page = pathname[pathname.length - 1];

  return (
    <div className="mt-16 w-full pb-12">
      <div className="mx-auto grid max-w-[1000px] gap-2 px-2 sm:px-6">
        <div className="flex items-center	justify-between px-4 ">
          <h1 className="text-2xl font-extrabold uppercase">My Nts</h1>
          <form action="../../auth/sign-out" method="post">
            <button className="flex items-center gap-1 text-sm font-extrabold uppercase">
              <span>Logout</span>
              <PhCaretRightBold className="h-3 w-3" />
            </button>
          </form>
        </div>
        <nav className="flex gap-2 border-b border-white text-sm font-extrabold uppercase text-neutral-200">
          <Link
            className={twMerge(
              "mb-[-3px] p-5",
              page === "shows" && "border-b-2 border-white",
            )}
            href={`/my-nts/favourites/shows`}
          >
            Hosts
          </Link>
          <Link
            className={twMerge(
              "mb-[-3px]  p-5",
              page === "episodes" && "border-b-2 border-white",
            )}
            href={`/my-nts/favourites/episodes`}
          >
            Episodes
          </Link>
        </nav>
        <div className="pt-4 sm:px-4">{children}</div>
      </div>
    </div>
  );
};

export default MyNtsNav;
