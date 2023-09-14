
import { MixtapeList } from "@/types/mixtapes";
import LandingPageMixtapeItem from "./LandingPageMixtapeItem";
import Link from "next/link";
import { useRef, useState } from "react";
import MixtapeGenralItem from "./MixtapeGenralItem";

interface LandingPageMixtapeListProps {
  mixtapeList: MixtapeList;
}

const LandingPageMixtapeList: React.FC<LandingPageMixtapeListProps> = ({
  mixtapeList,
}) => {

  return (
    <div>
      <div className=" grid  h-[calc(100vh-79px)] w-full grid-cols-3  border border-red-500 p-2	">
        <MixtapeGenralItem mixtapeList={mixtapeList} />
        {mixtapeList.results.map((entry) => (
          <LandingPageMixtapeItem data={entry} key={entry.title} />
        ))}
      </div>
    </div>
  );
};

export default LandingPageMixtapeList;
