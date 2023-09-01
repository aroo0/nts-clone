"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Show } from "@/types/live";
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
import { toast } from "react-hot-toast";
import { IonVolumeHighSharp, IonVolumeMute, MdiCalendarHeart, MdiPlaylistMusic, PhCaretDownBold, PhCaretUpBold } from "./Icons";

const RadioBar = () => {
  const routes = useRoutes();

  const { data, isLoading } = useQuery({
    queryKey: ["station-query"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${API_PATH.LIVE}`);
      return data.results as Show[];
    },
    onError: (err: any) => {
      return toast.error("Something went wrong. Try again later.");
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

  console.log(data)

  useEffect(() => {
    if (activeHowl) {
      activeHowl.volume(volume);
    }
  }, [volume, activeHowl]);

  return (
    <>
      <Collapsible.Root
        className="fixed top-[44px] flex w-full lg:h-[34px] z-[90]"
        open={radioDescOpen}
        onOpenChange={setRadioDescOpen}
        disabled={isLoading}
      >
        <div className="grid w-full flex-1 border-white lg:flex">
          <div
            className={twMerge(
              "hidden w-[150px] items-center gap-2 border-r border-black bg-white  pl-2 pr-4 lg:flex",
              radioDescOpen && "absolute translate-y-[-35px]",
            )}
          >
            <p className="whitespace-nowrap text-xs font-bold uppercase text-black">
              Live now
            </p>
            <div className="pulse-opacity h-1.5 w-1.5 rounded-full bg-red-500" />
          </div>
          <RadioStation
            station={data?.[0]}
            stationName="1"
            isLoading={isLoading}
            radioDescOpen={radioDescOpen}
            toggleRadio={toggleRadio}
          />
          <RadioStation
            station={data?.[1]}
            stationName="2"
            isLoading={isLoading}
            radioDescOpen={radioDescOpen}
            toggleRadio={toggleRadio}
          />
          <Collapsible.CollapsibleContent className="CollapsibleContent w-full lg:absolute bg-black">
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
              "absolute bottom-0 z-[1] flex h-[30px] w-full items-center justify-center gap-2 border-b border-white bg-black  pr-[25%] font-extrabold transition sm:pr-[10%] lg:hidden",
              !radioDescOpen && "opacity-0",
            )}
          >
            <LinkItem linkData={routes.scheduleMy}>
              <MdiCalendarHeart className="pr-1 w-6 h-6" />
            </LinkItem>
          </div>

          {/* Nav radio menu */}
          <div className="z-[20] flex justify-self-end lg:hidden">
            <div className="outer-polygon-path h-[30px] w-[55px] border-b border-white bg-white">
              <div className="inner-polygon-path flex h-full w-full items-center justify-center pl-3">
                <MdiPlaylistMusic className='w-4 h-4' />
              </div>
            </div>
            <Collapsible.Trigger>
              <div
                className={twMerge(
                  "flex h-[30px] w-[40px] items-center justify-center border-b border-l border-white bg-black",
                  radioDescOpen && "bg-white text-black",
                )}
              >
              {!radioDescOpen ? (
                <PhCaretDownBold className="w-4 h-4" />
              ) : (
                <PhCaretUpBold className="w-4 h-4" />
              )}
              </div>
            </Collapsible.Trigger>
          </div>
        </div>

        <div className="z-10 hidden bg-black lg:flex">
          {/* Desktop radio menu */}
          <Collapsible.Trigger>
            <div
              className={twMerge(
                "flex aspect-square h-[34px] cursor-pointer items-center justify-center border-x border-b border-white",
                radioDescOpen && "bg-white text-black",
              )}
            >
              {!radioDescOpen ? (
                <PhCaretDownBold className="w-4 h-4" />
              ) : (
                <PhCaretUpBold className="w-4 h-4" />
              )}
            </div>
          </Collapsible.Trigger>
          <div className="flex aspect-square h-[34px] cursor-pointer items-center justify-center border-b border-r border-white">
            <MdiCalendarHeart className='w-5 h-5' />
          </div>
          <div className="flex aspect-square h-[34px] cursor-pointer items-center justify-center border-b border-r border-white">
            <MdiPlaylistMusic className='w-5 h-5' />
          </div>

          <HoverCard.Root openDelay={100} closeDelay={100}>
            <HoverCard.Trigger asChild>
              <div
                className="group flex aspect-square h-[34px] cursor-pointer items-center justify-center border-b border-white"
                onClick={() => toggleMute()}
              >
                {volume === 0 ? (
                  <IonVolumeMute  className="w-4 h-4  hover_links opacity-60" />
                ) : (
                  <IonVolumeHighSharp  className="w-4 h-4 hover_links" />
                )}
              </div>
            </HoverCard.Trigger>
            <HoverCard.Content className="HoverCardContent z-[100] w-[35px] border-x border-b border-white bg-black py-3">
              <Slider value={volume} onChange={(value) => setVolume(value)} />
            </HoverCard.Content>
          </HoverCard.Root>
        </div>
      </Collapsible.Root>
    </>
  );
};

export default RadioBar;
