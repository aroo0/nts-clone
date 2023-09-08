"use client";

import { ChannelStation} from "@/types/shows";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useState } from "react";
import { toggleRadioParams } from "@/types/general";
import { PhPlayFill, PhStopFill } from "./Icons";

interface RadioStationProps {
  station?: ChannelStation;
  isLoading: boolean;
  stationName: string;
  radioDescOpen: boolean;
  toggleRadio: (params: toggleRadioParams) => void;
}

const RadioStation: React.FC<RadioStationProps> = ({
  station,
  isLoading,
  stationName,
  radioDescOpen,
  toggleRadio,
}) => {
  const { activePlayer } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (activePlayer?.stationName === stationName) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [activePlayer]);

  const detailsInfo = station?.now.embeds.details;

  return (
    <div
      className={twMerge(
        "flex h-[34px] w-full cursor-pointer items-center gap-1 border-b  border-white bg-black px-1 transition-transform duration-300 hover:bg-neutral-700 lg:odd:border-l ",
        isPlaying && "bg-white hover:bg-white",
        radioDescOpen && "absolute translate-y-[-35px]",
      )}
      onClick={() => toggleRadio({ stationName: stationName, type: "radio" })}
    >
      <div className="pulse-opacity mx-1 h-1.5 w-1.5 rounded-full bg-red-500 lg:hidden" />
      <div
        className={twMerge(
          `flex h-[25px] w-[25px] items-center justify-center bg-white pt-0.5 font-extrabold text-black`,
          isPlaying && "bg-black text-white",
        )}
      >
        {stationName}
      </div>

      {isPlaying ? (
        <PhStopFill className="text-black" />
      ) : (
        <PhPlayFill
          className={twMerge(isLoading && "animate-pulse text-neutral-500")}
        />
      )}
      <div className="grid flex-1 items-center truncate pl-1 lg:grid-cols-6	">
        {isLoading ? (
          <div className="h-3 w-[60%] animate-pulse bg-neutral-500 lg:col-span-2" />
        ) : (
          <p
            className={clsx(
              "mr-2 truncate text-sm font-extrabold uppercase lg:col-span-5",
              isPlaying && "text-black",
            )}
          >
            {detailsInfo?.name}
          </p>
        )}

        {isLoading ? (
          <div className="mr-4 hidden h-3 w-[80px] animate-pulse justify-self-end  bg-neutral-500 lg:col-span-4 lg:block	" />
        ) : (
          <p
            className={clsx(
              "hidden justify-self-end pr-4 text-xs font-extralight uppercase lg:block",
              isPlaying && "text-black",
            )}
          >
            {detailsInfo?.location_long}
          </p>
        )}
      </div>
    </div>
  );
};

export default RadioStation;
