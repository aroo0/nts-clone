"use client";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Show } from "@/types/live";
import { PiCaretDown } from "react-icons/pi";
import { LuCalendarHeart } from "react-icons/lu";
import { RiPlayListFill } from "react-icons/ri";
import { FaVolumeHigh } from "react-icons/fa6";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface RadioProps {}

const Radio = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["station-query"],
  //   queryFn: async () => {
  //     const { data } = await axios.get('https://www.nts.live/api/v2/live')
  //     return data.results as Show[]
  //   }
  // })

  // // Check if data is loading
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // // Check if data is available
  // if (!data) {
  //   return <div>No data available</div>;
  // }

  // console.log(data)

  const isPlaying = true;

  return (
    <div className="fixed top-[44px] h-[34px] flex  w-full">
      <div className="hidden md:flex bg-white items-center pl-2 pr-4 gap-2">
        <p className="uppercase text-xs text-black font-bold">Live now</p>
        <div className="bg-red-500 w-1.5 h-1.5 rounded-full pulse-opacity" />
      </div>
      <div className="flex-1 grid grid-cols-2 border-y border-white">
        <div
          className={clsx(
            "flex items-center gap-1 px-1 hover:bg-neutral-700 cursor-pointer",
            isPlaying && "hover:bg-white bg-white border-l border-black"
          )}
        >
          <div
            className={twMerge(
              `h-[25px] w-[25px] flex justify-center items-center text-black bg-white font-extrabold pt-0.5`,
              isPlaying && "bg-black text-white"
            )}
          >
            1
          </div>
          {isPlaying ? (
            <IoStopSharp size={15} className="text-black" />
          ) : (
            <IoPlaySharp size={20} />
          )}
          <p className={clsx("uppercase font-extrabold text-sm flex-1", isPlaying && "text-black")}>Naomi Asa</p>

          <p className={clsx("uppercase text-xs pr-4 font-extralight", isPlaying && "text-black")}>London</p>
        </div>
        <div>content2</div>
      </div>
      <div className="flex ">
        <div className="border-white border-y border-x aspect-square flex items-center justify-center cursor-pointer">
          <PiCaretDown size={16} />
        </div>
        <div className="border-white border-y border-r aspect-square flex items-center justify-center cursor-pointer">
          <LuCalendarHeart size={16} />
        </div>
        <div className="border-white border-y border-r aspect-square flex items-center justify-center cursor-pointer">
          <RiPlayListFill size={16} />
        </div>
        <div className="border-white border-y aspect-square flex items-center justify-center cursor-pointer">
          <FaVolumeHigh size={15} />
        </div>
      </div>
    </div>
  );
};

export default Radio;
