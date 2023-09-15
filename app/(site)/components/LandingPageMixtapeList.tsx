"use client";
import { MixtapeList } from "@/types/mixtapes";
import LandingPageMixtapeItem from "./LandingPageMixtapeItem";
import { useState } from "react";
import MixtapeGenralItem from "./MixtapeGenralItem";
import { MaterialSymbolsClose } from "@/components/Icons";
import { twMerge } from "tailwind-merge";

interface LandingPageMixtapeListProps {
  mixtapeList: MixtapeList;
}

const LandingPageMixtapeList: React.FC<LandingPageMixtapeListProps> = ({
  mixtapeList,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div
      className={twMerge(
        "mx-1 right-0 top-0 z-[20] translate-x-0 grid grid-cols-2  bg-black  p-2  transition sm:grid-cols-3 md:h-[400px]  md:grid-cols-5 lg:absolute lg:h-[calc(100vh-81px)] lg:w-[550px] lg:grid-cols-3",
        !isDrawerOpen && "2xl:translate-x-[30%]",
      )}
    >
      <MixtapeGenralItem mixtapeList={mixtapeList} />
      {mixtapeList.results.map((entry) => (
        <LandingPageMixtapeItem data={entry} key={entry.title} />
      ))}
      <button
        className="absolute left-[-27px] top-10 hidden h-9 w-9 items-center justify-center border-y border-l border-neutral-600 bg-black lg:flex"
        onClick={() => setIsDrawerOpen((prev) => !prev)}
      >
        <MaterialSymbolsClose
          className={twMerge(
            "h-5 w-5 transition",
            !isDrawerOpen && "rotate-45 ",
          )}
        />
      </button>
    </div>
  );
};

export default LandingPageMixtapeList;
