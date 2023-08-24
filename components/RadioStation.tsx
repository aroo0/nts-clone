"use client";

import { Broadcast } from "@/types/live";
import clsx from "clsx";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useState } from "react";

interface RadioStationProps {
  broadcast?: Broadcast;
  isLoading: boolean;
  stationName: string;
  radioDescOpen: boolean;
  toggleRadio: (stationName: string) => void;
}

const RadioStation: React.FC<RadioStationProps> = ({
  broadcast,
  isLoading,
  stationName,
  radioDescOpen,
  toggleRadio,
}) => {
  const { activePlayer } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (activePlayer === stationName) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [activePlayer]);


  const detailsInfo = broadcast?.embeds.details;

  return (
    <div
      className={twMerge(
        "flex items-center gap-1 px-1 bg-black hover:bg-neutral-700 cursor-pointer h-[34px] w-full border-white border-b first:lg:border-r transition-transform duration-300 ",
        isPlaying && "hover:bg-white bg-white",
        radioDescOpen && "absolute translate-y-[-35px]"
      )}
      onClick={() => toggleRadio(stationName)}
    >
      <div className="lg:hidden bg-red-500 w-1.5 h-1.5 rounded-full pulse-opacity mx-1" />
      <div
        className={twMerge(
          `h-[25px] w-[25px] flex justify-center items-center text-black bg-white font-extrabold pt-0.5`,
          isPlaying && "bg-black text-white"
        )}
      >
        {stationName}
      </div>

      <div className="bg-red-200">

      </div>
      {isPlaying ? (
        <IoStopSharp size={15} className="text-black" />
      ) : (
      //     <ClipLoader
      //       color="#fff"
      //       loading={loadingSpiner}
      //       size={13}
      //       cssOverride={{ margin: "0 3px" }}
      //       speedMultiplier={0.6}
      //       aria-label="Loading Spinner"
      //     />
        <IoPlaySharp
          size={20}
          className={isLoading && "text-neutral-500 animate-pulse"}
        />
      )}
      <div className="grid lg:grid-cols-6 items-center truncate flex-1	">
        {isLoading ? (
          <div className="bg-neutral-500 h-3 animate-pulse lg:col-span-2 w-[60%]" />
        ) : (
          <p
            className={clsx(
              "uppercase font-extrabold text-sm truncate lg:col-span-5 mr-2",
              isPlaying && "text-black"
            )}
          >
            {detailsInfo?.name}
          </p>
        )}

        {isLoading ? (
          <div className="bg-neutral-500 w-[80px] h-3 animate-pulse mr-4 hidden  lg:col-span-4 lg:block justify-self-end	" />
        ) : (
          <p
            className={clsx(
              "uppercase text-xs pr-4 font-extralight hidden lg:block justify-self-end",
              isPlaying && "text-black"
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
