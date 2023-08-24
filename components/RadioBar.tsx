"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Show } from "@/types/live";
import { PiCaretDown, PiCaretUp } from "react-icons/pi";
import { LuCalendarHeart } from "react-icons/lu";
import { RiPlayListFill } from "react-icons/ri/";
import { FaVolumeHigh } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/stores/usePlayer";
import RadioStation from "./RadioStation";
import RadioStationDescription from "./RadioStationDescription";
import LinkItem from "./LinkItem";
import useRoutes from "@/hooks/useRoutes";
import { API_PATH, API_URL } from "@/const/api";
import useRadioToggle from "@/hooks/useRadioToggle";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Collapsible from "@radix-ui/react-collapsible";
import Slider from "./Slider";
import { FaVolumeMute } from "react-icons/fa";

const Radio = () => {
  const routes = useRoutes();

  const { data, isLoading } = useQuery({
    queryKey: ["station-query"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${API_PATH.LIVE}`);
      return data.results as Show[];
    },
  });

  const [radioDescOpen, setRadioDescOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const { toggleRadio } = useRadioToggle();
  const { activeHowl } = usePlayer();

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(0.5);
    } else {
      setVolume(0);
    }
  };

  useEffect(() => {
    if (activeHowl) {
      activeHowl.volume(volume);
    }
  }, [volume, activeHowl]);

  return (
    <>
      <Collapsible.Root
        className="fixed top-[44px] lg:h-[34px] flex w-full"
        open={radioDescOpen}
        onOpenChange={setRadioDescOpen}
        disabled={isLoading}
      >
        <div className="flex-1 grid lg:flex border-white w-full">
          <div
            className={twMerge(
              "hidden lg:flex bg-white items-center pl-2 pr-4 gap-2  w-[150px] border-r border-black",
              radioDescOpen && "absolute translate-y-[-35px]"
            )}
          >
            <p className="uppercase text-xs text-black font-bold whitespace-nowrap">
              Live now
            </p>
            <div className="bg-red-500 w-1.5 h-1.5 rounded-full pulse-opacity" />
          </div>
          <RadioStation
            broadcast={data?.[0].now}
            stationName="1"
            isLoading={isLoading}
            radioDescOpen={radioDescOpen}
            toggleRadio={toggleRadio}
          />
          <RadioStation
            broadcast={data?.[1].now}
            stationName="2"
            isLoading={isLoading}
            radioDescOpen={radioDescOpen}
            toggleRadio={toggleRadio}
          />
          <Collapsible.CollapsibleContent className=" bg-black lg:absolute w-full CollapsibleContent">
            <div className="grid lg:grid-cols-2">
              <RadioStationDescription
                station={data?.[0]}
                stationName="1"
                isLoading={isLoading}
                toggleRadio={toggleRadio}
              />

              <RadioStationDescription
                station={data?.[1]}
                stationName="2"
                isLoading={isLoading}
                toggleRadio={toggleRadio}
              />
            </div>
          </Collapsible.CollapsibleContent>
          <div
            className={twMerge(
              "z-[1] flex lg:hidden bg-black border-b border-white h-[30px] bottom-0 absolute w-full pr-[25%] sm:pr-[10%]  items-center justify-center gap-2 font-extrabold transition",
              !radioDescOpen && "opacity-0"
            )}
          >
            <LinkItem linkData={routes.scheduleMy}>
              <LuCalendarHeart size={20} className="pr-1" />
            </LinkItem>
          </div>

          {/* Nav radio menu */}
          <div className="justify-self-end flex lg:hidden z-[20]">
            <div className="border-white border-b h-[30px] w-[55px] outer-polygon-path bg-white">
              <div className="inner-polygon-path w-full h-full pl-3 flex items-center justify-center">
                <RiPlayListFill size={14} />
              </div>
            </div>
            <Collapsible.Trigger>
              <div
                className={twMerge(
                  "border-white border-b border-l flex items-center justify-center h-[30px] w-[40px]",
                  radioDescOpen && "bg-white text-black"
                )}
              >
                {!radioDescOpen ? (
                  <PiCaretDown size={16} />
                ) : (
                  <PiCaretUp size={16} />
                )}
              </div>
            </Collapsible.Trigger>
          </div>
        </div>

        <div className="hidden lg:flex bg-black z-10">
          {/* Desktop radio menu */}
          <Collapsible.Trigger>
            <div
              className={twMerge(
                "border-white border-b border-x aspect-square h-[34px] flex items-center justify-center cursor-pointer",
                radioDescOpen && "bg-white text-black"
              )}
            >
              {!radioDescOpen ? (
                <PiCaretDown size={16} />
              ) : (
                <PiCaretUp size={16} />
              )}
            </div>
          </Collapsible.Trigger>
          <div className="border-white border-b border-r aspect-square h-[34px] flex items-center justify-center cursor-pointer">
            <LuCalendarHeart size={16} />
          </div>
          <div className="border-white border-b border-r aspect-square h-[34px] flex items-center justify-center cursor-pointer">
            <RiPlayListFill size={16} />
          </div>

          <HoverCard.Root openDelay={100} closeDelay={100}>
            <HoverCard.Trigger asChild>
              <div
                className="border-white border-b aspect-square h-[34px] flex items-center justify-center cursor-pointer group"
                onClick={() => toggleMute()}
              >
                {volume === 0 ? (
                  <FaVolumeMute size={15} className="hover_links opacity-60" />
                ) : (
                  <FaVolumeHigh size={15} className="hover_links" />
                )}
              </div>
            </HoverCard.Trigger>
            <HoverCard.Content className="bg-black w-[35px] z-[100] border-x border-b border-white HoverCardContent py-3">
              <Slider value={volume} onChange={(value) => setVolume(value)} />
            </HoverCard.Content>
          </HoverCard.Root>
        </div>
      </Collapsible.Root>
    </>
  );
};

export default Radio;
