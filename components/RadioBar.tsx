"use client";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Show } from "@/types/live";
import { PiCaretDown } from "react-icons/pi";
import { LuCalendarHeart } from "react-icons/lu";
import { RiPlayListFill } from "react-icons/ri";
import { FaVolumeHigh } from "react-icons/fa6";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/stores/usePlayer";
import RadioStation from "./RadioStation";
import * as Collapsible from "@radix-ui/react-collapsible";

interface RadioProps {}

const Radio = () => {
  const { activePlayer, reset } = usePlayer();
  const { data, isLoading } = useQuery({
    queryKey: ["station-query"],
    queryFn: async () => {
      const { data } = await axios.get("https://www.nts.live/api/v2/live");
      return data.results as Show[];
    },
  });

  const [mobileRadioDescOpen, setMobileRadioDescOpen] = useState(false);

  return (
    <>
      <Collapsible.Root
        className="fixed top-[44px] lg:h-[34px] flex w-full"
        open={mobileRadioDescOpen}
        onOpenChange={setMobileRadioDescOpen}
      >
        <div className="hidden lg:flex bg-white items-center pl-2 pr-4 gap-2 border-r ">
          <p className="uppercase text-xs text-black font-bold">Live now</p>
          <div className="bg-red-500 w-1.5 h-1.5 rounded-full pulse-opacity" />
        </div>
        <div className="flex-1 grid lg:grid-cols-2 border-t border-white w-full">
          <RadioStation
            broadcast={data?.[0].now}
            stationName="1"
            isLoading={isLoading}
            mobileRadioDescOpen={mobileRadioDescOpen}
          />
          <RadioStation
            broadcast={data?.[1].now}
            stationName="2"
            isLoading={isLoading}
            mobileRadioDescOpen={mobileRadioDescOpen}

          />
          <Collapsible.CollapsibleContent className=" bg-red-200 h-[300px] w-full CollapsibleContent">
            I am contemt
          </Collapsible.CollapsibleContent>
          {/* Nav radio menu */}
          <div className="justify-self-end flex lg:hidden">
            <div className="border-white border-b h-[30px] w-[55px] outer-polygon-path bg-white">
              <div className="inner-polygon-path w-full h-full pl-3 flex items-center justify-center">
                <LuCalendarHeart size={14} />
              </div>
            </div>
            <Collapsible.Trigger>
              <div className="border-white border-b border-l flex items-center justify-center h-[30px] w-[40px]">
                <PiCaretDown size={16} />
              </div>
            </Collapsible.Trigger>
          </div>
        </div>
      </Collapsible.Root>

      <div className=" hidden lg:flex">
        {/* Desktop radio menu */}

        <div className="border-white border-y border-r aspect-square h-[34px] flex items-center justify-center cursor-pointer">
          <PiCaretDown size={16} />
        </div>
        <div className="border-white border-y border-r aspect-square h-[34px] flex items-center justify-center cursor-pointer">
          <LuCalendarHeart size={16} />
        </div>
        <div className="border-white border-y border-r aspect-square h-[34px] flex items-center justify-center cursor-pointer">
          <RiPlayListFill size={16} />
        </div>
        <div className="border-white border-y aspect-square h-[34px] flex items-center justify-center cursor-pointer">
          <FaVolumeHigh size={15} />
        </div>
      </div>
    </>
  );
};

export default Radio;
